from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException, NoSuchElementException
import time

chrome = webdriver.Chrome()
    
def get_all_organizations(cursor):
    url = "https://rutgers.campuslabs.com/engage/organizations"

    chrome.get(url)
    time.sleep(3)
    chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    show_more_xpath = "/html/body/div[2]/div/div/div/div/div[2]/div[3]/div/div[2]/div[2]/button"
    show_more = chrome.find_element(By.XPATH, show_more_xpath, )
    
    while True:
        try:
            time.sleep(0.1)
            show_more.click()
            WebDriverWait(chrome, 10).until(
                EC.visibility_of_element_located(
                    (
                        By.XPATH,
                        show_more_xpath,
                    )
                )
            )
        except StaleElementReferenceException:
            break
        except TimeoutException:
            break

    html = chrome.page_source
    soup = BeautifulSoup(html, "lxml")
    org_list_container = soup.find_all("div", id="org-search-results")
    org_list = org_list_container[0].find_all("a")
    org_descs = org_list_container[0].find_all("span")
        
    for org in org_list[651:]:
        org_id = str(org['href']).split('/')[3]
        get_org_details(cursor, org_id)
        org_img = org_descs[i].find('img')
        if org_img is not None:
            image_id = str(org_img['src']).split('/')[5]
        else:
            image_id = 'no_img'
        
        get_org_details(cursor, org_id)
        get_org_images(cursor, org_id, image_id)

        
def get_org_images(cursor, org_id, image_id):
    query = """INSERT INTO Organizations (org_id, image_id)
               VALUES(%s, %s) 
               ON DUPLICATE KEY UPDATE
               image_id = VALUES(image_id);"""

    cursor.execute(query, (org_id, image_id))
    
def get_org_details(cursor, org_id):
    base_url = 'https://rutgers.campuslabs.com/engage/organization/'
    org_url = base_url + org_id
    chrome.get(org_url)
    time.sleep(1.75)
    
    image_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[1]/img'
    try: 
        image = chrome.find_element(By.XPATH, image_xpath)
        image_id = image.get_attribute('src').split('/')[5]
    except NoSuchElementException as e:
        image_id = None
        
    name_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[1]/h1'
    try: 
        name = chrome.find_element(By.XPATH, name_xpath, ).text
    except NoSuchElementException as e:
        name = None
    
    about_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[2]'
    try:
        about = chrome.find_element(By.XPATH, about_xpath, ).text
    except NoSuchElementException as e:
        about = None
    
    contact_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[3]/div/div[2]'
    try:
        contact = chrome.find_element(By.XPATH, contact_xpath, ).text
    except NoSuchElementException as e:
        contact = None
    
    socials_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[4]'
    try:
        socials = chrome.find_element(By.XPATH, socials_xpath, ).find_elements(By.XPATH, './child::*')
        socials = [social.get_attribute('href') for social in socials if social.get_attribute('href') is not None]
    except NoSuchElementException as e:
        socials = None
        
    if contact is None and not socials:
        faq_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[4]/div/div[2]'
    else:
        faq_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[5]/div/div[2]'
    try:
        faq = chrome.find_element(By.XPATH, faq_xpath, ).text
    except NoSuchElementException as e:
        faq = None
        
    query = """INSERT INTO Organizations (org_id, name, about, contact, faq)
           VALUES (%s, %s, %s, %s, %s)
           ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           about = VALUES(about),
           contact = VALUES(contact),
           faq = VALUES(faq);"""

    cursor.execute(query, (org_id, name, about, contact, faq))
        
def get_categories(conn, cursor):
    url = 'https://rutgers.campuslabs.com/engage/organizations'
    chrome.get(url)

    categories_list = chrome.find_element(By.ID, "categories")
    categories_list.click()
    categories_xpath = '/html/body/div[4]/div[3]/ul'
    
    try:
        categories_length = len(chrome.find_element(By.XPATH, categories_xpath).find_elements(By.XPATH, './child::*'))
        time.sleep(0.1)
        for i in range(categories_length):
            WebDriverWait(chrome, 10).until(
                EC.visibility_of_element_located(
                    (
                        By.XPATH,
                        categories_xpath,
                    )
                )
            )
            
            categories = chrome.find_element(By.XPATH, categories_xpath)

            WebDriverWait(categories, 10).until(
                EC.visibility_of_all_elements_located((By.XPATH, './child::*'))
            )
            
            category = categories.find_elements(By.XPATH, './child::*')[i]
            name = category.text
            category.click()
            category_url = chrome.current_url
            category_id = str(category_url).split('=')[1]
            
            query = """INSERT INTO OrganizationCategories (category_id, name)
                       VALUES (%s, %s)
                       ON DUPLICATE KEY UPDATE
                       name = VALUES(name);"""
                       
            cursor.execute(query, (category_id, name))
            conn.commit()
            
            get_org_categories(cursor, category_id)

            time.sleep(0.1)
            chrome.get(url)
            time.sleep(0.1)
            categories_list = chrome.find_element(By.ID, "categories")
            categories_list.click()
    except NoSuchElementException as e:
        categories = None

def get_org_categories(cursor, category_id):
    base_url = 'https://rutgers.campuslabs.com/engage/organizations?categories='
    category_url = base_url + category_id
    chrome.get(category_url)
        
    try:
        chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        load_more_xpath = '/html/body/div[2]/div/div/div/div/div[2]/div[3]/div/div[2]/div[2]/button/div'

        while True:
            try:
                load_more = chrome.find_element(By.XPATH, load_more_xpath, )
                time.sleep(0.1)
                load_more.click()
                WebDriverWait(chrome, 10).until(
                    EC.visibility_of_element_located(
                        (
                            By.XPATH,
                            load_more_xpath,
                        )
                    )
                )
            except StaleElementReferenceException:
                break
            except TimeoutException:
                break
            except NoSuchElementException:
                break
        
        html = chrome.page_source
        soup = BeautifulSoup(html, "lxml")
        time.sleep(3)
        org_list_container = soup.find_all("div", id="org-search-results")
        org_list = org_list_container[0].find_all("a")
            
        for org in org_list:
            org_id = str(org['href']).split('/')[3]
            
            query = """INSERT INTO CategorizedOrganizations (org_id, category_id)
                       VALUES (%s, %s)
                       ON DUPLICATE KEY UPDATE
                       org_id = VALUES(org_id),
                       category_id = VALUES(category_id);"""
            cursor.execute(query, (org_id, category_id))
            
    except NoSuchElementException as e:
        org_id = None