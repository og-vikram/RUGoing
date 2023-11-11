from flask_sqlalchemy import SQLAlchemy
from app import db

class Events(db.Model):
    __tablename__ = 'Events'

    event_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500))
    start = db.Column(db.Time)
    end = db.Column(db.Time)
    location = db.Column(db.String(255))
    online_location = db.Column(db.String(150))
    is_online = db.Column(db.Boolean)
    description = db.Column(db.Text)
    rsvp = db.Column(db.String(150))