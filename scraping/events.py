from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException, NoSuchElementException
import time

chrome = webdriver.Chrome()

def get_all_events(cursor):
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
        
    for event in event_list[101:151]:
        event_id = str(event['href']).split('/')[3]
        get_event_details(cursor, event_id)
    print(len(event_list))

def get_event_details(cursor, event_id):
    base_url = 'https://rutgers.campuslabs.com/engage/event/'
    url = base_url + event_id
    chrome.get(url)
    time.sleep(1.5)
    
    name_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[1]/div/div/span[1]/h1"
    try:
        name = chrome.find_element(By.XPATH, name_xpath, ).text
    except NoSuchElementException as e:
        name = None
    
    start_time_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[1]"
    try:
        start = chrome.find_element(By.XPATH, start_time_xpath).text
    except NoSuchElementException as e:
        start = None
    
    end_time_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[2]"
    try:
        end = chrome.find_element(By.XPATH, end_time_xpath).text
    except NoSuchElementException as e:
        end = None
    
    location_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[2]/div/div[2]"
    try: 
        location_list = chrome.find_element(By.XPATH, location_xpath).find_elements(By.XPATH, './child::*')
        location = ''
        for element in location_list:
            if element.tag_name != 'a':
                location += element.text + '\n'
    except NoSuchElementException as e:
        location = None
    
    online_location_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[3]/div/div[2]/a'
    try: 
        online_location = chrome.find_element(By.XPATH, online_location_xpath, ).get_attribute('href')
    except NoSuchElementException as e:
        online_location = None
        
    is_online = False if online_location is None else True
    
    description_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[2]/div[1]/div[2]'
    try: 
        description = chrome.find_element(By.XPATH, description_xpath) 
        desc_list = description.text.splitlines()
        description = ''
        for desc in desc_list[1:]:
            description += desc + '\n'
    except NoSuchElementException as e:
        description = None
    
    perks_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[2]/div[1]/div[3]/div"
    try:
        perks = chrome.find_element(By.XPATH, perks_xpath, )
    except NoSuchElementException as e:
        perks = None
    
    categories_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[2]/div[1]/div[4]/div'
    try:
        categories = chrome.find_element(By.XPATH, categories_xpath, )
    except NoSuchElementException as e:
        categories = None
    
    rsvp_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[2]/div[2]/div/div/div/div/a'
    try:
        rsvp = chrome.find_element(By.XPATH, rsvp_xpath, ).get_attribute('href')
    except NoSuchElementException as e:
        rsvp = None
    
    host_org_link_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[3]/div/a'
    try:
        host_org_link = chrome.find_element(By.XPATH, host_org_link_xpath, )
        host_org_id = str(host_org_link.get_attribute('href')).split('/')[5]
    except NoSuchElementException as e:
        host_org_id = None
    
    # print(name)
    # print(start_time)
    # print(end_time)
    # print(location)
    # print(online_loc)
    # print(host_org_id)
    # print(rsvp.get_attribute('href'))
        
    query = """INSERT INTO Events (event_id, name, start, end, location, online_location, is_online, description, rsvp)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
               ON DUPLICATE KEY UPDATE 
               name = VALUES(name), 
               start = VALUES(start), 
               end = VALUES(end), 
               location = VALUES(location), 
               online_location = VALUES(online_location), 
               is_online = VALUES(is_online), 
               description = VALUES(description), 
               rsvp = VALUES(rsvp);"""
               
    cursor.execute(query, (event_id, name, start, end, location, online_location, is_online, description, rsvp))

    # print(desc.text)
    # if desc is not None:
        # desc_list = desc.text.splitlines()
        # for description in desc_list[1:]:
        #     print(description)
    if perks is not None:
        perks_list = perks.text.splitlines()
        for perk in perks_list:
            print(perk)
    if categories is not None:
        categories_list = categories.text.splitlines()
        for category in categories_list:
            print(category)
    print(host_org_id)

   
def get_categories(conn, cursor):
    url = 'https://rutgers.campuslabs.com/engage/events'
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
            
            query = """INSERT INTO EventCategories (category_id, name)
                       VALUES (%s, %s)
                       ON DUPLICATE KEY UPDATE
                       name = VALUES(name);"""
                       
            cursor.execute(query, (category_id, name))
            conn.commit()
            
            get_event_categories(cursor, category_id)

            time.sleep(0.1)
            chrome.get(url)
            time.sleep(0.1)
            categories_list = chrome.find_element(By.ID, "categories")
            categories_list.click()
    except NoSuchElementException as e:
        categories = None
        
def get_event_categories(cursor, category_id):
    base_url = 'https://rutgers.campuslabs.com/engage/events?categories='
    category_url = base_url + category_id
    chrome.get(category_url)
        
    try:
        chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        load_more_xpath = '/html/body/div[2]/div/div/div/div/div[4]/div/div/div[2]/div[2]/div[2]/button/div/div'

        while True:
            try:
                load_more = chrome.find_element(By.XPATH, load_more_xpath, )
                time.sleep(0.1)
                load_more.click()
                # check if element is visible -- this will throw TimeoutException if not
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
        event_list_container = soup.find_all("div", id="event-discovery-list")
        event_list = event_list_container[0].find_all("a")
            
        for org in event_list:
            event_id = str(org['href']).split('/')[3]
            
            query = """INSERT INTO CategorizedEvents (org_id, category_id)
                       VALUES (%s, %s)
                       ON DUPLICATE KEY UPDATE
                       event_id = VALUES(event_id),
                       category_id = VALUES(category_id);"""
            cursor.execute(query, (event_id, category_id))
            
    except NoSuchElementException as e:
        event_id = None
    
    
def get_event_perks():
    url = 'https://rutgers.campuslabs.com/engage/events'
    chrome.get(url)

    perks_list = chrome.find_element(By.ID, "perks")
    perks_list.click()
   
    perks_xpath = '/html/body/div[4]/div[3]/ul'
    perks = chrome.find_element(By.XPATH, perks_xpath).find_elements(By.XPATH, './child::*')
    
    time.sleep(3)
    for perk in perks:
        print(perk.text)
    
def get_event_themes():
    url = 'https://rutgers.campuslabs.com/engage/events'
    chrome.get(url)

    themes_list = chrome.find_element(By.ID, "themes")
    themes_list.click()
   
    themes_xpath = '/html/body/div[4]/div[3]/ul'
    themes = chrome.find_element(By.XPATH, themes_xpath).find_elements(By.XPATH, './child::*')
    
    time.sleep(3)
    for theme in themes:
        print(theme.text)
        
# TESTING 

# event1 = 'https://rutgers.campuslabs.com/engage/event/9468557' 
# event2 = 'https://rutgers.campuslabs.com/engage/event/9392626'
# event3 = 'https://rutgers.campuslabs.com/engage/event/9404883'
# event4 = 'https://rutgers.campuslabs.com/engage/event/9454901'
# event5 = 'https://rutgers.campuslabs.com/engage/event/9404883'
# event6 = 'https://rutgers.campuslabs.com/engage/event/9467360'
# get_event_details(event6)

# get_event_themes()
# get_event_categories()
# get_event_perks()

# get_event_details('https://rutgers.campuslabs.com/engage/event/9551789')
