from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/organization")
def get_organization_info():
  organization_name = ""
  events = []
  mission = ""
  join_link = ""

  response = {
    "organization_name": organization_name,
    "events": events,
    "mission": mission,
    "join_link": join_link
  }

  return jsonify(response)

if __name__ == "__main__":
  app.run(debug=True)
