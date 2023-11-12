import pymysql
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import mysql.connector as mysql
import json
import dotenv
import os

dotenv.load_dotenv()

db = SQLAlchemy()
app = Flask(__name__)

# config = {
#     "user": os.getenv("DB_USER"),
#     "password": os.getenv("DB_PASSWORD"),
#     "host": os.getenv("DB_HOST"),
#     "database": os.getenv("DB_NAME"),
#     "port": os.getenv("DB_PORT"),
# }

username = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
userpass = 'mysql+pymysql://' + username + ':' + password + '@'
server   = '127.0.0.1'
dbname   = os.getenv("DB_NAME")

socket   = '?unix_socket=/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'

app.config['SQLALCHEMY_DATABASE_URI'] = userpass + server + dbname + socket
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# initialize the app with Flask-SQLAlchemy
db.init_app(app)

@app.route('/')
def testdb():
    try:
        db.session.query(text('1')).from_statement(text('SELECT 1')).all()
        return '<h1>It works.</h1>'
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

# @app.route("/api/event/<event_id>")
# def get_event(event_id):
#     event = event_id

#     conn = mysql.connect(**config)
#     cursor = conn.cursor()

#     try:
#         cursor.execute(
#             f"SELECT name, start, end, location, online_location, is_online, description, rsvp FROM Events WHERE event_id = {event};"
#         )
        
#     except mysql.Error as err:
#         print(f"Error: {err}")

#     r = [
#         dict((cursor.description[i][0], value) for i, value in enumerate(row))
#         for row in cursor.fetchall()
#     ]
#     cursor.close()
#     conn.close()
#     return json.dumps(r[0]) if r else None


# @app.route("/api/event/all")
# def get_all_events():
#     conn = mysql.connect(**config)
#     cursor = conn.cursor()

#     try:
#         cursor.execute("SELECT event_id, name, start, end, location, online_location, is_online, description, rsvp FROM Events;")

#     except mysql.Error as err:
#         print(f"Error: {err}")

#     r = [
#         dict((cursor.description[i][0], value) for i, value in enumerate(row))
#         for row in cursor.fetchall()
#     ]
#     cursor.close()
#     conn.close()
#     return json.dumps(r) if r else None

if __name__ == "__main__":
    app.run(debug=True)
