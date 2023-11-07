
import flask
from flask import Flask, request, jsonify
import mysql.connector as mysql
import json
import dotenv
import os

dotenv.load_dotenv()

app = Flask(__name__)

config = {
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME"),
    "port": os.getenv("DB_PORT"),
}

@app.route("/api/event/<event_id>")
def get_event(event_id):
    event = event_id

    conn = mysql.connect(**config)
    cursor = conn.cursor()

    try:
        cursor.execute(
            "SELECT name, start, end, location, online_location, is_online, description, rsvp FROM Events WHERE event_id = %s",
            (event,),
        )
        
    except mysql.Error as err:
        print(f"Error: {err}")

    r = [
        dict((cursor.description[i][0], value) for i, value in enumerate(row))
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return json.dumps(r[0]) if r else None


@app.route("/api/event/all")
def get_all_events():
    conn = mysql.connect(**config)
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT event_id, name, start, end, location, online_location, is_online, description, rsvp FROM Organizations")

    except mysql.Error as err:
        print(f"Error: {err}")

    r = [
        dict((cursor.description[i][0], value) for i, value in enumerate(row))
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return json.dumps(r) if r else None

if __name__ == "__main__":
    app.run(debug=True)
