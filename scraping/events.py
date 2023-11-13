from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException, NoSuchElementException
import time
from datetime import datetime

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

def get_event_details(event_id):
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
        
    input_string = start + ' ' + end
    date_format = "%A, %B %d %Y at %I:%M %p %Z"
    start_date_string, end_date_string = input_string.split(" to ")

    start_date = datetime.strptime(start_date_string, date_format)
    end_date = datetime.strptime(end_date_string, date_format)

    start_date_formatted = start_date.strftime("%Y-%m-%d %H:%M")
    end_date_formatted = end_date.strftime("%Y-%m-%d %H:%M")

    print("Start Date and Time:", start_date_formatted)
    print("End Date and Time:", end_date_formatted)

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
        
    # query = """INSERT INTO Events (event_id, name, start, end, location, online_location, is_online, description, rsvp)
    #            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    #            ON DUPLICATE KEY UPDATE 
    #            name = VALUES(name), 
    #            start = VALUES(start), 
    #            end = VALUES(end), 
    #            location = VALUES(location), 
    #            online_location = VALUES(online_location), 
    #            is_online = VALUES(is_online), 
    #            description = VALUES(description), 
    #            rsvp = VALUES(rsvp);"""
               
    # cursor.execute(query, (event_id, name, start, end, location, online_location, is_online, description, rsvp))

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
        for i in range(10, categories_length):
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
            
        for event in event_list:
            event_id = str(event['href']).split('/')[3]
            print(event_id, category_id)
            
            # query = """INSERT INTO CategorizedEvents (event_id, category_id)
            #            VALUES (%s, %s)
            #            ON DUPLICATE KEY UPDATE
            #            event_id = VALUES(event_id),
            #            category_id = VALUES(category_id);"""
            query = """INSERT IGNORE INTO CategorizedEvents (event_id, category_id)
                       SELECT %s, %s
                       FROM Events
                       WHERE event_id = %s"""
            cursor.execute(query, (event_id, category_id, event_id))
            
    except NoSuchElementException as e:
        event_id = None
    
def get_perks(conn, cursor):
    url = 'https://rutgers.campuslabs.com/engage/events?perks='
    chrome.get(url)

    perks_list = chrome.find_element(By.ID, "perks")
    perks_list.click()
    
    perks_xpath = '/html/body/div[4]/div[3]/ul'
    try:
        perks_length = len(chrome.find_element(By.XPATH, perks_xpath).find_elements(By.XPATH, './child::*'))
        time.sleep(0.1)
        for i in range(perks_length):
            WebDriverWait(chrome, 10).until(
                EC.visibility_of_element_located(
                    (
                        By.XPATH,
                        perks_xpath,
                    )
                )
            )
            
            perks = chrome.find_element(By.XPATH, perks_xpath)

            WebDriverWait(perks, 10).until(
                EC.visibility_of_all_elements_located((By.XPATH, './child::*'))
            )
            
            perk = perks.find_elements(By.XPATH, './child::*')[i]
            name = perk.text
            perk.click()
            perk_url = chrome.current_url
            perk_id = str(perk_url).split('=')[1]
            
            query = """INSERT INTO EventPerks (perk_id, name)
                       VALUES (%s, %s)
                       ON DUPLICATE KEY UPDATE
                       name = VALUES(name);"""
                       
            cursor.execute(query, (perk_id, name))
            conn.commit()
            
            get_event_perks(cursor, perk_id)

            time.sleep(0.1)
            chrome.get(url)
            time.sleep(0.1)
            perks_list = chrome.find_element(By.ID, "perks")
            perks_list.click()
    except NoSuchElementException as e:
        perks = None
    
def get_event_perks(cursor, perk_id):
    base_url = 'https://rutgers.campuslabs.com/engage/events?perks='
    perk_url = base_url + perk_id
    chrome.get(perk_url)
        
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
            
        for event in event_list:
            event_id = str(event['href']).split('/')[3]
            
            # query = """INSERT INTO PerkedEvents (event_id, perk_id)
            #            VALUES (%s, %s)
            #            ON DUPLICATE KEY UPDATE
            #            event_id = VALUES(event_id),
            #            perk_id = VALUES(perk_id);"""
            
            query = """INSERT IGNORE INTO PerkedEvents (event_id, perk_id)
                       SELECT %s, %s
                       FROM Events
                       WHERE event_id = %s"""
            cursor.execute(query, (event_id, perk_id, event_id))
            
    except NoSuchElementException as e:
        event_id = None
        
def get_themes(conn, cursor):
    url = 'https://rutgers.campuslabs.com/engage/events?themes='
    chrome.get(url)

    themes_list = chrome.find_element(By.ID, "themes")
    themes_list.click()
    
    themes_xpath = '/html/body/div[4]/div[3]/ul'
    try:
        themes_length = len(chrome.find_element(By.XPATH, themes_xpath).find_elements(By.XPATH, './child::*'))
        time.sleep(0.1)
        for i in range(themes_length):
            WebDriverWait(chrome, 10).until(
                EC.visibility_of_element_located(
                    (
                        By.XPATH,
                        themes_xpath,
                    )
                )
            )
            
            themes = chrome.find_element(By.XPATH, themes_xpath)

            WebDriverWait(themes, 10).until(
                EC.visibility_of_all_elements_located((By.XPATH, './child::*'))
            )
            
            theme = themes.find_elements(By.XPATH, './child::*')[i]
            name = theme.text
            theme.click()
            theme_url = chrome.current_url
            theme_id = str(theme_url).split('=')[1]
            
            query = """INSERT INTO EventThemes (theme_id, name)
                       VALUES (%s, %s)
                       ON DUPLICATE KEY UPDATE
                       name = VALUES(name);"""
                       
            cursor.execute(query, (theme_id, name))
            conn.commit()
            
            get_event_themes(cursor, theme_id)

            time.sleep(0.1)
            chrome.get(url)
            time.sleep(0.1)
            themes_list = chrome.find_element(By.ID, "themes")
            themes_list.click()
    except NoSuchElementException as e:
        themes = None
    
def get_event_themes(cursor, theme_id):
    base_url = 'https://rutgers.campuslabs.com/engage/events?themes='
    theme_url = base_url + theme_id
    chrome.get(theme_url)
        
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
            
        for event in event_list:
            event_id = str(event['href']).split('/')[3]
            
            # query = """INSERT INTO ThemedEvents (event_id, theme_id)
            #            VALUES (%s, %s)
            #            ON DUPLICATE KEY UPDATE
            #            event_id = VALUES(event_id),
            #            theme_id = VALUES(theme_id);"""
            
            query = """INSERT IGNORE INTO ThemedEvents (event_id, theme_id)
                       SELECT %s, %s
                       FROM Events
                       WHERE event_id = %s"""
            cursor.execute(query, (event_id, theme_id, event_id))
            
    except NoSuchElementException as e:
        event_id = None
        
def modify_dates(cursor):
    query = """SELECT event_id FROM Events;"""
    cursor.execute(query)    
    event_ids = cursor.fetchall()
    
    for event_id in event_ids[250:]:
        base_url = 'https://rutgers.campuslabs.com/engage/event/'
        print(event_id[0])
        url = base_url + str(event_id[0])
        chrome.get(url)
        time.sleep(0.75)
        
        cancelled_xpath = '/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[1]/span/strong'
        try:
            cancelled = chrome.find_element(By.XPATH, cancelled_xpath).text
        except NoSuchElementException as e:
            cancelled = None
        
        if cancelled is None:
            start_time_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[1]"
            end_time_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[2]"
            is_cancelled = False
        else:
            start_time_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[2]"
            end_time_xpath = "/html/body/div[2]/div/div/div/div/div/div/div[1]/div/div/div[2]/div[2]/div[1]/div/div[2]/p[3]"
            is_cancelled = True
        
        try:
            start = chrome.find_element(By.XPATH, start_time_xpath).text
        except NoSuchElementException as e:
            start = None
        
        try:
            end = chrome.find_element(By.XPATH, end_time_xpath).text
        except NoSuchElementException as e:
            end = None
            
        input_string = start + ' ' + end
        date_format = "%A, %B %d %Y at %I:%M %p %Z"
        start_date_string, end_date_string = input_string.split(" to ")

        start = datetime.strptime(start_date_string, date_format)
        end = datetime.strptime(end_date_string, date_format)

        print(start)  
        print(end) 
        
        query = """INSERT INTO Events (event_id, start, end, is_cancelled)
               VALUES (%s, %s, %s, %s)
               ON DUPLICATE KEY UPDATE 
               start = VALUES(start), 
               end = VALUES(end),
               is_cancelled = VALUES(is_cancelled);"""
               
        cursor.execute(query, (event_id[0], start, end, is_cancelled))
        
        
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
# get_event_details('9509343')