# import RUGoing
# import scraping.events as events

# if __name__ == '__main__':
#     events.get_event_categories()

import mysql.connector


# Replace with your own connection parameters
config = {
    
}

conn = mysql.connector.connect(**config)
cursor = conn.cursor()

# Now you can execute SQL queries using cursor
try:
    cursor.execute("SELECT * FROM Events")
    rows = cursor.fetchall()  # Fetch all rows
    for row in rows:
        print(row)
except mysql.connector.Error as err:
    print(f"Error: {err}")

# Don't forget to close the cursor and connection when done
cursor.close()
conn.close()
