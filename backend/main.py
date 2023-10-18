import mysql.connector as mysql
import scraping.organizations as organizations

config = {
    'user': ' ',
    'password': ' ',  
    'host': ' ',
    'database': ' ',
    'port': ' ',
}

conn = mysql.connect(**config)
cursor = conn.cursor()

try:
    organizations.get_all_organizations(cursor)
    cursor.execute("SELECT * FROM Organizations")
    rows = cursor.fetchall()  # Fetch all rows
    for row in rows:
        print(row)
    conn.commit()
except mysql.Error as err:
    print(f"Error: {err}")

cursor.close()
conn.close()