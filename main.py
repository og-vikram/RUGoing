import mysql.connector as mysql
import scraping.organizations as organizations
import scraping.events as events
import os
import dotenv

dotenv.load_dotenv()

config = {
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASSWORD"),
    'host': os.getenv("DB_HOST"),
    'database': os.getenv("DB_NAME"),
    'port': os.getenv("DB_PORT"),
}

conn = mysql.connect(**config)
cursor = conn.cursor()

try:
    events.get_all_events(cursor)
    events.modify_dates(cursor)
    organizations.get_all_organizations(cursor)
    organizations.get_categories(conn, cursor)
    events.get_categories(conn, cursor)
    events.get_themes(conn, cursor)
    conn.commit()
except mysql.Error as err:
    print(f"Error: {err}")

cursor.close()
conn.close()