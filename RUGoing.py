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
    desc_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[2]/div[1]/div[2]/div/p"
    desc = chrome.find_element(By.XPATH, desc_xpath)
    print(name.text)
    print(start_time.text)
    print(end_time.text)
    print(location.text)
    print(desc.text)
   
event1 = 'https://rutgers.campuslabs.com/engage/event/9468557' 
event2 = 'https://rutgers.campuslabs.com/engage/event/9392626'
event3 = 'https://rutgers.campuslabs.com/engage/event/9404883'
get_event_details(event1)