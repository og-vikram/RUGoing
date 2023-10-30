import mysql.connector as mysql
import scraping.organizations as organizations
import scraping.events as events

config = {
    
}

conn = mysql.connect(**config)
cursor = conn.cursor()

try:
    # events.get_event_details(cursor, '9569310')
    events.get_all_events(cursor)
    # organizations.get_all_organizations(cursor)
    # organizations.get_categories(conn, cursor)
    # cursor.execute("SELECT * FROM Organizations")
    # rows = cursor.fetchall()  # Fetch all rows
    # for row in rows:
    #     print(row)
    conn.commit()
except mysql.Error as err:
    print(f"Error: {err}")

cursor.close()
conn.close()