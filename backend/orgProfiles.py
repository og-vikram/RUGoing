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


@app.route("/api/organization/<variable>")
def get_organization_info(variable):
    org = variable

    conn = mysql.connect(**config)
    cursor = conn.cursor()

    try:
        cursor.execute(
            "SELECT name, contact, about, faq FROM Organizations WHERE org_id = %s",
            (org,),
        )
        # rows = cursor.fetchall()  # Fetch all rows
        # for row in rows:
        #     print(row)
        #     print("\n")
    except mysql.Error as err:
        print(f"Error: {err}")

    r = [
        dict((cursor.description[i][0], value) for i, value in enumerate(row))
        for row in cursor.fetchall()
    ]
    cursor.close()
    conn.close()
    return json.dumps(r[0]) if r else None


@app.route("/api/organization/all")
def get_all_organizations():
    conn = mysql.connect(**config)
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT org_id, name, contact, about, faq FROM Organizations")
        # rows = cursor.fetchall()  # Fetch all rows
        # for row in rows:
        #     print(row)
        #     print("\n")
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
# get_organization_info()
