from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException, NoSuchElementException
import time

chrome = webdriver.Chrome()
    
def get_all_organizations():
    url = "https://rutgers.campuslabs.com/engage/organizations"

    # chrome.maximize_window()
    chrome.get(url)
    time.sleep(3)
    chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    show_more_xpath = "/html/body/div[2]/div/div/div/div/div[2]/div[3]/div/div[2]/div[2]/button"
    show_more = chrome.find_element(By.XPATH, show_more_xpath, )
    
    for _ in range(10):
        try:
            time.sleep(0.1)
            show_more.click()
            # check if element is visible -- this will throw TimeoutException if not
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
        
    for org in org_list[:10]:
        org_name = str(org['href']).split('/')[3]
        print(org_name)
        print()
    print(len(org_list))
    
def get_org_details(org_url):
    chrome.get(org_url)
    time.sleep(3)
    
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
        
    print(name)
    print(about)
    print(contact)
    print(faq)
    print(socials)
        
def get_org_categories():
    url = 'https://rutgers.campuslabs.com/engage/organizations'
    chrome.get(url)

    categories_list = chrome.find_element(By.ID, "categories")
    categories_list.click()
    
    categories_xpath = '/html/body/div[4]/div[3]/ul'
    try:
        categories = chrome.find_element(By.XPATH, categories_xpath).find_elements(By.XPATH, './child::*')
        time.sleep(3)
        for category in categories:
            print(category.text)
    except NoSuchElementException as e:
        categories = None
        

        
# TESTING 

# club1 = 'https://rutgers.campuslabs.com/engage/organization/rutgerschessclub'
# club2_thaakat = 'https://rutgers.campuslabs.com/engage/organization/thaakat'

# get_org_details(club2_thaakat)
# get_org_categories()
# club3_vorheesmentors = 'https://rutgers.campuslabs.com/engage/organization/barbaravoorheesmentors'
# club4_house = 'https://rutgers.campuslabs.com/engage/organization/canterburyhouse'
# club5_christiasn = 'https://rutgers.campuslabs.com/engage/organization/rucufi'

# get_org_details(club3_vorheesmentors)
# get_org_details(club5_christiasn)

get_all_organizations()
