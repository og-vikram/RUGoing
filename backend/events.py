from flask import Blueprint, jsonify 
from models import Events
from app import db

main_routes = Blueprint('events', __name__)

@main_routes.route('/events')
def get_users():
    #all_events = Events.query.all()
    all_events = db.session.execute(db.select(Events))
    event_list = []
    for event in all_events:
        event_list.append({
            'id': event.event_id,
            'name': event.name,
        })

    return jsonify(events=event_list)  
