from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import dotenv
import os
from events import main_routes 


dotenv.load_dotenv()

app = Flask(__name__)

username = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
userpass = 'mysql+pymysql://' + username + ':' + password + '@'
server   = os.getenv("DB_HOST")
dbname   = os.getenv("DB_NAME")

socket   = '?unix_socket=/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'

app.config['SQLALCHEMY_DATABASE_URI'] = userpass + server + dbname + socket
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
app.register_blueprint(main_routes)

if __name__ == '__main__':
    app.run(debug=True)