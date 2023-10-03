from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.common.exceptions import StaleElementReferenceException, TimeoutException


chrome = webdriver.Chrome()

url = "https://rutgers.campuslabs.com/engage/events"

# chrome.maximize_window()
chrome.get(url)
time.sleep(3)
chrome.execute_script("window.scrollTo(0, document.body.scrollHeight);")
show_more = chrome.find_element(
    By.XPATH,
    "/html/body/div[2]/div/div/div/div/div[4]/div/div/div[2]/div[2]/div[2]/button/div/div",
)
while True:
    try:
        time.sleep(1)
        show_more.click()
        # check if element is visible -- this will throw TimeoutException if not
        WebDriverWait(chrome, 10).until(
            EC.visibility_of_element_located(
                (
                    By.XPATH,
                    "/html/body/div[2]/div/div/div/div/div[4]/div/div/div[2]/div[2]/div[2]/button/div/div",
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
print(len(event_list))


# # open file
# with open("test.html", "w") as f:
#     f.write(soup.prettify())
