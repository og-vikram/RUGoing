from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/create_user", methods=["POST"])
def create_user():
  email = request.json["email"]
  password = request.json["password"]
  firstname = request.json["firstName"]
  lastname = request.json["lastName"]

  # Create a new user account in the database

  return jsonify({
    "message": "Account created successfully"
  })

if __name__ == "__main__":
  app.run(debug=True)
