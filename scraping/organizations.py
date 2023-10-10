from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
import time

chrome = webdriver.Chrome()
    
def get_all_organizations():
    base_url = 'https://rutgers.campuslabs.com'
    url = "https://rutgers.campuslabs.com/engage/organizations"

    # chrome.maximize_window()
    chrome.get(url)
    time.sleep(3)
    chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    show_more_xpath = "/html/body/div[2]/div/div/div/div/div[2]/div[3]/div/div[2]/div[2]/button"
    show_more = chrome.find_element(By.XPATH, show_more_xpath, )
    
    while True:
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
        
    for org in org_list:
        new_url = base_url + org['href']
        print(new_url)
        print()
    print(len(org_list))
    
def get_org_details(org_url):
    chrome.get(org_url)
    time.sleep(3)
    
    name_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[1]/h1'
    name = chrome.find_element(By.XPATH, name_xpath, )
    
    about_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[2]'
    about = chrome.find_element(By.XPATH, about_xpath, )
    
    contact_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[3]/div/div[2]'
    contact = chrome.find_element(By.XPATH, contact_xpath, )
    
    socials_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[4]'
    socials = chrome.find_element(By.XPATH, socials_xpath, ).find_elements(By.XPATH, './child::*')
    
    faq_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[5]/div/div[2]'
    faq = chrome.find_element(By.XPATH, faq_xpath, )
    
    print(name.text)
    print(about.text)
    print(contact.text)
    print(faq.text)
    for social in socials:
        print(social.get_attribute('href'))
        
def get_org_categories():
    url = 'https://rutgers.campuslabs.com/engage/organizations'
    chrome.get(url)

    categories_list = chrome.find_element(By.ID, "categories")
    categories_list.click()
    
    categories_xpath = '/html/body/div[4]/div[3]/ul'
    categories = chrome.find_element(By.XPATH, categories_xpath).find_elements(By.XPATH, './child::*')
    
    time.sleep(3)
    for category in categories:
        print(category.text)
        
# TESTING 

# club1 = 'https://rutgers.campuslabs.com/engage/organization/rutgerschessclub'
# club2_thaakat = 'https://rutgers.campuslabs.com/engage/organization/thaakat'

# get_org_details(club2_thaakat)
# get_org_categories()