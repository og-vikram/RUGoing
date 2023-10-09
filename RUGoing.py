from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
import time

chrome = webdriver.Chrome()

def get_all_events():
    base_url = 'https://rutgers.campuslabs.com'
    url = "https://rutgers.campuslabs.com/engage/events"

    # chrome.maximize_window()
    chrome.get(url)
    time.sleep(3)
    chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    show_more_xpath = "/html/body/div[2]/div/div/div/div/div[4]/div/div/div[2]/div[2]/div[2]/button/div/div"
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
    event_list_container = soup.find_all("div", id="event-discovery-list")
    event_list = event_list_container[0].find_all("a")
        
    for event in event_list:
        new_url = base_url + event['href']
        print(new_url)
        print()
    print(len(event_list))
    
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
    
# get_all_organizations()

def get_event_details(event_url):
    chrome.get(event_url)
    time.sleep(3)
    html = chrome.page_source
    soup = BeautifulSoup(html, "lxml")
    name_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/span[1]/h1"
    name = chrome.find_element(By.XPATH, name_xpath, )
    start_time_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[1]"
    start_time = chrome.find_element(By.XPATH, start_time_xpath)
    end_time_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[2]"
    end_time = chrome.find_element(By.XPATH, end_time_xpath)
    location_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[2]/div/div[2]/p"
    location = chrome.find_element(By.XPATH, location_xpath)
    # desc_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[2]/div[1]/div[2]/div/p"
    desc_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[2]/div[1]/div[2]'
    desc = chrome.find_element(By.XPATH, desc_xpath)
    perks_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[2]/div[1]/div[3]/div"
    perks = chrome.find_element(By.XPATH, perks_xpath, )
    
    categories_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[2]/div[1]/div[4]/div'
    categories = chrome.find_element(By.XPATH, categories_xpath, )
    
    rsvp_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div/a'
    rsvp = chrome.find_element(By.XPATH, rsvp_xpath, )
    
    host_org_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[3]/div/a/div/div/span/div/div/h3'
    host_org = chrome.find_element(By.XPATH, host_org_xpath, )
    
    host_org_link_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[3]/div/a'
    host_org_link = chrome.find_element(By.XPATH, host_org_link_xpath, )
    
    print(name.text)
    print(start_time.text)
    print(end_time.text)
    print(location.text)
    # print(desc.text)
    desc_list = desc.text.splitlines()
    perks_list = perks.text.splitlines()
    categories_list = categories.text.splitlines()
    for description in desc_list:
        print(description)
    for perk in perks_list:
        print(perk)
    for category in categories_list:
        print(category)
    print(rsvp.get_attribute('href'))
    print(host_org.text)
    print(host_org_link.get_attribute('href'))
    
def get_org_details(org_url):
    chrome.get(org_url)
    time.sleep(3)
    html = chrome.page_source
    soup = BeautifulSoup(html, "lxml")
    
    name_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[1]/h1'
    name = chrome.find_element(By.XPATH, name_xpath, )
    
    about_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[2]'
    about = chrome.find_element(By.XPATH, about_xpath, )
    
    contact_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[3]/div/div[2]'
    contact = chrome.find_element(By.XPATH, contact_xpath, )
    
    socials_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[4]'
    socials = chrome.find_element(By.XPATH, socials_xpath, )
    
    faq_xpath = '/html/body/div[2]/div/div/div/div/div[1]/div/div[2]/div/div[5]/div/div[2]'
    faq = chrome.find_element(By.XPATH, faq_xpath, )
    
    print(name.text)
    print(about.text)
    print(contact.text)
    print(faq.text)
    
   
   
# event1 = 'https://rutgers.campuslabs.com/engage/event/9468557' 
# event2 = 'https://rutgers.campuslabs.com/engage/event/9392626'
# event3 = 'https://rutgers.campuslabs.com/engage/event/9404883'
# event4 = 'https://rutgers.campuslabs.com/engage/event/9454901'
# event5 = 'https://rutgers.campuslabs.com/engage/event/9404883'
# event6 = 'https://rutgers.campuslabs.com/engage/event/9467360'
# get_event_details(event6)

club1 = 'https://rutgers.campuslabs.com/engage/organization/rutgerschessclub'
get_org_details(club1)