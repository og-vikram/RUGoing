from flask import Blueprint, jsonify  # Import jsonify from Flask
from models import Events

main_routes = Blueprint('main', __name__)

@main_routes.route('/events')
def get_users():
    all_events = Events.query.all()

    # Process and return users as JSON
    event_list = []
    for event in all_events:
        event_list.append({
            'id': event.event_id,
            'name': event.name,
            # Add other user attributes here
        })

    return jsonify(events=event_list)  # Return the users as JSON