import flask
from flask import Flask, request, jsonify
import mysql.connector as mysql
import json

app = Flask(__name__)

@app.route("/api/organization")
def get_organization_info():
  #org = request.json(organization_id)
  org = "aac"
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
    cursor.execute(
    "SELECT name, contact, about, faq FROM organizations WHERE org_id =?", 
    (org,))
  except mysql.Error as err:
    print(f"Error: {err}")


  r = [dict((cursor.description[i][0], value) 
    for i, value in enumerate(row)) for row in cursor.fetchall()]
  cursor.close()
  conn.close()
  return (json.dumps(r[0]) if r else None)

if __name__ == "__main__":
  app.run(debug=True)
