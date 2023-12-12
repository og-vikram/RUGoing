from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import PrimaryKeyConstraint, String
from sqlalchemy import and_
from sqlalchemy import func, cast, distinct
import json
import dotenv
import os

dotenv.load_dotenv()

#Configure SQLAlchemy
db = SQLAlchemy()
# Initialize Flask app
app = Flask(__name__)

#Database Configuration
username = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
userpass = 'mysql+pymysql://' + username + ':' + password + '@'
server = os.getenv("DB_HOST")
dbname   = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = userpass + server + dbname
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

#Initialize SQLAlchemy
db.init_app(app)

"""
Events Model
   - Table Name: `Events`
   - Description: Represents events with various details such as name, start and end times, location, and description.

    Fields:
 event_id, name, start, end, is_cancelled, location, online_location, is_online, description and rsvp
"""
class Events(db.Model):
    __tablename__ = 'Events'

    event_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500))
    start = db.Column(db.DateTime)
    end = db.Column(db.DateTime)
    is_cancelled = db.Column(db.Boolean)
    location = db.Column(db.String(255))
    online_location = db.Column(db.String(150))
    is_online = db.Column(db.Boolean)
    description = db.Column(db.Text)
    rsvp = db.Column(db.String(150))
   
"""
AttendingEvents Model:
Table Name: `AttendingEvents`
   - Description: Represents the relationship between users and events they are attending.

    Fields:
    - `event_id` (Integer, Primary Key): Foreign key referencing the `event_id` in the `Events` table.
    - `user_id` (String, 50 characters, Primary Key): Identifier for the user attending the event.
"""
class AttendingEvents(db.Model):
    __tablename__ = 'AttendingEvents'

    event_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'user_id'),
    )

"""
EventPerks Model
   - Table Name: `EventPerks`
   - Description: Represents perks that can be associated with events.

    Fields:
    - `perk_id` (String, 25 characters, Primary Key): Unique identifier for each perk.
    - `name` (String, 20 characters, Not Null): Name of the perk.
"""

class EventPerks(db.Model):
    __tablename__ = 'EventPerks'

    perk_id = db.Column(db.String(25), primary_key=True)
    name = db.Column(db.String(20), nullable=False)

"""
PerkedEvents Model
   - Table Name: `PerkedEvents`
   - Description: Represents the relationship between events and the perks associated with them.

    Fields:
    - `event_id` (Integer, Primary Key): Foreign key referencing the `event_id` in the `Events` table.
    - `perk_id` (String, 25 characters, Primary Key): Foreign key referencing the `perk_id` in the `EventPerks` table.
"""

class PerkedEvents(db.Model):
    __tablename__ = 'PerkedEvents'

    event_id = db.Column(db.Integer, primary_key=True)
    perk_id = db.Column(db.String(25), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'perk_id'),
    )

"""
EventThemes Model
   - Table Name: `EventThemes`
   - Description: Represents themes that can be associated with events.

    Fields:
    - `theme_id` (String, 25 characters, Primary Key): Unique identifier for each theme.
    - `name` (String, 50 characters, Not Null): Name of the theme.
"""
class EventThemes(db.Model):
    __tablename__ = 'EventThemes'

    theme_id = db.Column(db.String(25), primary_key=True)
    name = db.Column(db.String(50), nullable=False)


"""
ThemedEvents Model
   - Table Name: `ThemedEvents`
   - Description: Represents the relationship between events and themes associated with them.

    Fields:
    - `event_id` (Integer, Primary Key): Foreign key referencing the `event_id` in the `Events` table.
    - `theme_id` (String, 25 characters, Primary Key): Foreign key referencing the `theme_id` in the `EventThemes` table.
"""
class ThemedEvents(db.Model):
    __tablename__ = 'ThemedEvents'

    event_id = db.Column(db.Integer, primary_key=True)
    theme_id = db.Column(db.String(25), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'theme_id'),
    )

"""
EventCategories Model
   - Table Name: `EventCategories`
   - Description: Represents categories that can be associated with events.

    Fields:
    - `category_id` (Integer, Primary Key): Unique identifier for each category.
    - `name` (String, 50 characters, Not Null): Name of the category.
"""
class EventCategories(db.Model):
    __tablename__ = 'EventCategories'

    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

"""
EventHosts Model
   - Table Name: `EventHosts`
   - Description: Represents the relationship between events and hosting organizations.

    Fields:
    - `event_id` (Integer, Primary Key): Foreign key referencing the `event_id` in the `Events` table.
    - `org_id` (String, 200 characters, Primary Key): Identifier for the hosting organization.
"""
class EventHosts(db.Model):
    __tablename__ = 'EventHosts'

    event_id = db.Column(db.Integer, primary_key=True)
    org_id = db.Column(db.String(200), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'org_id'),
    )

"""
CategorizedEvents Model
   - Table Name: `CategorizedEvents`
   - Description: Represents the relationship between events and categories associated with them.

    Fields:
    - `event_id` (Integer, Primary Key): Foreign key referencing the `event_id` in the `Events` table.
    - `category_id` (Integer, Primary Key): Foreign key referencing the `category_id` in the `EventCategories` table.

"""
class CategorizedEvents(db.Model):
    __tablename__ = 'CategorizedEvents'  

    event_id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'category_id'),
    )

"""
Organizations Model
   - Table Name: `Organizations`
   - Description: Represents organizations with details such as name, about, contact information, and frequently asked questions.

    Fields:
    - `org_id` (String, 200 characters, Primary Key): Unique identifier for each organization.
    - `image_id` (String, 100 characters): Identifier for the organization's image.
    - `name` (String, 200 characters): Name of the organization.
    - `about` (Text): Description of the organization.
    - `contact` (Text): Contact information for the organization.
    - `faq` (Text): Frequently asked questions about the organization.
"""

class Organizations(db.Model):
    __tablename__ = 'Organizations'

    org_id = db.Column(db.String(200), primary_key=True)
    image_id = db.Column(db.String(100))
    name = db.Column(db.String(200))
    about = db.Column(db.Text)
    contact = db.Column(db.Text)
    faq = db.Column(db.Text)


"""
OrganizationCategories Model
   - Table Name: `OrganizationCategories`
   - Description: Represents categories that can be associated with organizations.

    Fields:
    - `category_id` (Integer, Primary Key): Unique identifier for each category.
    - `name` (String, 255 characters, Not Null): Name of the category.
"""
class OrganizationCategories(db.Model):
    __tablename__ = 'OrganizationCategories'

    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
   
"""
JoinedOrganizations Model
   - Table Name: `JoinedOrganizations`
   - Description: Represents the relationship between users and organizations they have joined.

    Fields:
    - `user_id` (String, 50 characters, Primary Key): Identifier for the user.
    - `org_id` (String, 200 characters, Primary Key): Identifier for the joined organization.
"""
class JoinedOrganizations(db.Model):
    __tablename__ = 'JoinedOrganizations'
   
    user_id = db.Column(db.String(50), primary_key=True)
    org_id = db.Column(db.String(200), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'org_id'),
    )

"""
CategorizedOrganizations Model
    - Table Name: `CategorizedOrganizations`
    - Description: Represents the relationship between organizations and categories associated with them.

    Fields:
    - `org_id` (String, 200 characters, Primary Key): Foreign key referencing the `org_id` in the `Organizations` table.
    - `category_id` (Integer, Primary Key): Foreign key referencing the `category_id` in the `OrganizationCategories` table.
"""
class CategorizedOrganizations(db.Model):
    __tablename__ = 'CategorizedOrganizations'

    org_id = db.Column(db.String(200), primary_key=True)
    category_id = db.Column(db.Integer, primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('org_id', 'category_id'),
    )

"""
PreferredEventPerks Model
    - Table Name: `PreferredEventPerks`
    - Description: Represents the preferred perks for a user.

    Fields:
    - `user_id` (String, 50 characters, Primary Key): Identifier for the user.
    - `perk_id` (String, 25 characters, Primary Key): Identifier for the preferred perk.
"""
class PreferredEventPerks(db.Model):
    __tablename__ = 'PreferredEventPerks'

    user_id = db.Column(db.String(50), primary_key=True)
    perk_id = db.Column(db.String(25), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'perk_id'),
    )

"""
PreferredEventCategories Model
    - Table Name: `PreferredEventCategories`
    - Description: Represents the preferred event categories for a user.

    Fields:
    - `user_id` (String, 50 characters, Primary Key): Identifier for the user.
    - `category_id` (Integer, Primary Key): Identifier for the preferred event category.
"""
class PreferredEventCategories(db.Model):
    __tablename__ = 'PreferredEventCategories'

    user_id = db.Column(db.String(50), primary_key=True)
    category_id = db.Column(db.Integer, primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'category_id'),
    )

"""PreferredEventThemes Model
    - Table Name: `PreferredEventThemes`
    - Description: Represents the preferred event themes for a user.

    Fields:
    - `user_id` (String, 50 characters, Primary Key): Identifier for the user.
    - `theme_id` (String, 25 characters, Primary Key): Identifier for the preferred event theme.
"""
class PreferredEventThemes(db.Model):
    __tablename__ = 'PreferredEventThemes'

    user_id = db.Column(db.String(50), primary_key=True)
    theme_id = db.Column(db.String(25), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'theme_id'),
    )

"""PreferredOrganizationCategories Model
    - Table Name: `PreferredOrganizationCategories`
    - Description: Represents the preferred organization categories for a user.

    Fields:
    - `user_id` (String, 50 characters, Primary Key): Identifier for the user.
    - `category_id` (Integer, Primary Key): Identifier for the preferred organization category.
"""
class PreferredOrganizationCategories(db.Model):
    __tablename__ = 'PreferredOrganizationCategories'

    user_id = db.Column(db.String(50), primary_key=True)
    category_id = db.Column(db.Integer, primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'category_id'),
    )

"""
Users Model
    - Table Name: `Users`
    - Description: Represents user profiles with details such as username, bio description, first name, last name, officer status, and associated organization.

    Fields:
    - `user_id` (String, 50 characters, Primary Key): Unique identifier for each user.
    - `netid` (String, 50 characters): User's net ID.
    - `username` (String, 50 characters, Not Null): User's username.
    - `bio_descrip` (Text): User's bio description.
    - `firstname` (String, 50 characters): User's first name.
    - `lastname` (String, 50 characters): User's last name.
    - `isOfficer` (Boolean): Indicates whether the user is an officer.
    - `organization` (String, 200 characters): Identifier for the associated organization.
"""
class Users(db.Model):
    __tablename__ = 'Users'

    user_id = db.Column(db.String(50), primary_key=True)
    netid = db.Column(db.String(50))
    username = db.Column(db.String(50), nullable=False)
    bio_descrip = db.Column(db.Text)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    isOfficer = db.Column(db.Boolean)
    organization = db.Column(db.String(200))

"""
Follows Model
    - Table Name: `Follows`
    - Description: Represents the relationship between users where one user follows another.

    Fields:
    - `follower_id` (String, 50 characters, Primary Key): Identifier for the user following.
    - `followee_id` (String, 50 characters, Primary Key): Identifier for the user being followed.
"""
class Follows(db.Model):
    __tablename__ = 'Follows'

    follower_id = db.Column(db.String(50), primary_key=True)
    followee_id = db.Column(db.String(50), primary_key=True)
   
    __table_args__ = (
        PrimaryKeyConstraint('follower_id', 'followee_id'),
    )

"""
Get All Events
Endpoint: /api/event/all
Method: GET
Description: Retrieve information about all events.
Response:
200 OK: List of events with details.
"""
@app.route('/api/event/all')
def get_events():
    all_events = Events.query.all()
    event_list = []
    for event in all_events:
        event_dict = {
            'id': event.event_id,
            'name': event.name,
            'start': str(event.start) if event.start else None,
            'end': str(event.end) if event.end else None,
            'is_cancelled': event.is_cancelled,
            'location': event.location,
            'online_location': event.online_location,
            'is_online': event.is_online,
            'description': event.description,
            'rsvp': event.rsvp,
        }
        event_list.append(event_dict)
    return json.dumps({'events': event_list})

"""
Get Event By ID
Endpoint: /api/event/<int:id>
Method: GET
Description: Retrieve details about a specific event by its ID.
Parameters:
id (Integer): ID of the event.
Response:
200 OK: Details of the event.
404 Not Found: If the event with the given ID does not exist.
"""
@app.route('/api/event/<int:id>')
def get_event(id):
    event_data = db.session.query(
        Events, EventHosts.org_id.label('host_org_id'), Organizations.name.label('host_org_name')
    ).join(
        EventHosts, Events.event_id == EventHosts.event_id
    ).join(
        Organizations,
        Organizations.org_id == EventHosts.org_id
    ).filter(
        Events.event_id == id
    ).first()

    if event_data:
        print(event_data)
        event, host_org_id, host_org_name = event_data
        event_details = {
            'id': event.event_id,
            'name': event.name,
            'start': str(event.start) if event.start else None,
            'end': str(event.end) if event.end else None,
            'is_cancelled': event.is_cancelled,
            'location': event.location,
            'online_location': event.online_location,
            'is_online': event.is_online,
            'description': event.description,
            'rsvp': event.rsvp,
            'host_org_id': host_org_id,
            'host_org_name': host_org_name,
        }
        return json.dumps({'event': event_details})
    else:
        return json.dumps({'error': 'Event not found'})
   
"""
Get Event Host by Event ID
Endpoint: /api/event/host/<int:id>
Method: GET
Description: Retrieve the host organization of a specific event by its ID.
Parameters:
id (Integer): ID of the event.
Response:
200 OK: Host organization details.
404 Not Found: If the host organization or event does not exist.
"""
@app.route('/api/event/host/<int:id>')
def get_event_host(id):
    host = EventHosts.query.filter_by(event_id=id).with_entities(EventHosts.org_id).first()

    if host:
        organization = Organizations.query.filter_by(org_id=host[0]).first()
        if organization:
            org_name = organization.name
            return json.dumps({
                'org_id': host[0],
                'org_name': org_name
            })
        else:
            return json.dumps({'error': 'Organization not found'})
    else:
        return json.dumps({'error': 'Event host not found'})
   
"""
Add Event Attendee
Endpoint: /api/event/attending/add/
Method: POST
Description: Add a user as an attendee to a specific event.
Request Body:
uid (String): User ID.
event_id (Integer): Event ID.
Response:
200 OK: Success message if the attendee is added successfully.
200 OK (if relation already exists): Message indicating that the relationship already exists.
"""
@app.route('/api/event/attending/add/', methods=['POST'])
def add_event_attendee():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    event_id = data['event_id']
    attendee = AttendingEvents(user_id = uid, event_id = event_id)
    account = AttendingEvents.query.filter(
        and_(AttendingEvents.user_id == uid,
             AttendingEvents.event_id == event_id
        )
    ).first()
    if account is None:
        db.session.add(attendee)
        db.session.commit()
        return json.dumps({'success': True, 'uid': uid, 'event_id': event_id})
    else:
        return json.dumps({'relation already exists': True})
   
"""
Remove Event Attendee
Endpoint: /api/event/attending/remove/
Method: POST
Description: Remove a user as an attendee from a specific event.
Request Body:
uid (String): User ID.
event_id (Integer): Event ID.
Response:
200 OK: Success message if the attendee is removed successfully.
"""
@app.route('/api/event/attending/remove/', methods=['POST'])
def remove_event_attendee():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    event_id = data['event_id']
    attendee = AttendingEvents.query.filter(
        and_(AttendingEvents.user_id == uid,
             AttendingEvents.event_id == event_id
        )
    ).first()
    if attendee is not None:
        db.session.delete(attendee)
        db.session.commit()
        return json.dumps({'message': 'Attendee removed successfully'})
    else:
        return json.dumps({'message': 'Attendee does not exist.'})


"""
Get Attending Events for a User
Endpoint: /api/event/attending/<uid>
Method: GET
Description: Retrieve events that a specific user is attending.
Parameters:
uid (String): User ID.
Response:
200 OK: List of events with details.
"""
@app.route('/api/event/attending/<uid>', methods=['GET'])
def get_attending_events(uid):
    event_data = db.session.query(
        AttendingEvents.event_id, Events.name
    ).join(
        Events, Events.event_id == AttendingEvents.event_id
    ).filter(
        AttendingEvents.user_id == uid
    ).all()
    print(event_data)
    events = []
    for event in event_data:
        event_id, name = event
        event_dict = {
            'id': event_id,
            'name': name,
        }
        events.append(event_dict)
    return json.dumps({'user': uid, 'events': events})

"""
Get Event Attendees
Endpoint: /api/event/attending/<int:event_id>
Method: GET
Description: Retrieve the list of users attending a specific event.
Parameters:
event_id (Integer): Event ID.
Response:
200 OK: List of user IDs attending the event.
"""
@app.route('/api/event/attending/<int:event_id>', methods=['GET'])
def get_event_attendees(event_id):
    user_ids = AttendingEvents.query.filter_by(event_id=event_id).with_entities(AttendingEvents.user_id).all()
    users = [user_id[0] for user_id in user_ids]
   
    total_users_count = len(users)

    return json.dumps({'event': event_id, 'users': users, 'total_users_count': total_users_count})

"""
Events Attended by Followees
Endpoint: /api/event/attending/followees/<uid>
Method: GET
Description: Retrieve events attended by users followed by a specific user.
Parameters:
uid (String): User ID.
Response:
200 OK: List of events with details.
"""
@app.route('/api/event/attending/followees/<uid>')
def events_attended_by_followees(uid):
    result = db.session.query(
        Events.event_id, Events.name.label('event_name')
    ).join(
        AttendingEvents, AttendingEvents.event_id == Events.event_id
    ).join(
        Follows, Follows.followee_id == AttendingEvents.user_id
    ).filter(
        Follows.follower_id == uid
    ).distinct().all()
    events_attended = [{'event_id': event[0], 'event_name': event[1]} for event in result]
    return json.dumps({'uid': uid, 'events': events_attended})

"""
Get Event Categories
Endpoint: /api/event/categories
Method: GET
Description: Retrieve a list of all event categories.
Response:
200 OK: List of categories with details.
"""
@app.route('/api/event/categories')
def get_event_categories():
    all_categories = EventCategories.query.all()
    cat_list = []
    for cat in all_categories:
        cat_dict = {
            'id': cat.category_id,
            'name': cat.name,
        }
        cat_list.append(cat_dict)
    return json.dumps({'categories': cat_list})

"""
Get Events by Categories
Endpoint: /api/event/categorized/all
Method: GET
Description: Retrieve events grouped by their categories.
Response:
200 OK: List of categorized events with details.
"""
@app.route('/api/event/categorized/all')
def get_events_by_categories():
    result = db.session.query(
        EventCategories.category_id,
        EventCategories.name.label('category_name'),
        cast(db.func.group_concat(
            func.json_object(
                'id',Events.event_id,
                'name', Events.name,
                'description', Events.description
            )
        ), String).label('event_list')
    ).join(
        CategorizedEvents, EventCategories.category_id == CategorizedEvents.category_id
    ).join(
        Events, CategorizedEvents.event_id == Events.event_id
    ).group_by(EventCategories.category_id, EventCategories.name).all()
   
    categorized_events = []
    for category_id, category_name, event_list_str in result:
        events = json.loads(f"[{event_list_str.replace('},{', '},{')}]")
        categorized_events.append({'category_id': category_id, 'category_name': category_name, 'events': events})
   
    return json.dumps(categorized_events)
   
"""
Get Categories by Event
Endpoint: /api/event/categories/all
Method: GET
Description: Retrieve categories associated with each event.
Response:
200 OK: List of events with their associated categories.
"""
@app.route('/api/event/categories/all')
def get_categories_by_event():
    result = db.session.query(
        CategorizedEvents.event_id,
        db.func.group_concat(EventCategories.name).label('category_names')
    ).join(
        EventCategories,
        CategorizedEvents.category_id == EventCategories.category_id
    ).group_by(CategorizedEvents.event_id).all()
    categorized_events = [{'event_id': event_id, 'category_names': category_names.split(',')} for event_id, category_names in result]
    return json.dumps(categorized_events)

"""
Get Event Themes
Endpoint: /api/event/themes
Method: GET
Description: Retrieve a list of all event themes.
Response:
200 OK: List of themes with details.
"""
@app.route('/api/event/themes')
def get_event_themes():
    all_themes = EventThemes.query.all()
    theme_list = []
    for theme in all_themes:
        theme_dict = {
            'id': theme.theme_id,
            'name': theme.name,
        }
        theme_list.append(theme_dict)
    return json.dumps({'themes': theme_list})

"""
Get Events by Themes
Endpoint: /api/event/themed/all
Method: GET
Description: Retrieve events grouped by their themes.
Response:
200 OK: List of themed events with details.
"""
@app.route('/api/event/themed/all')
def get_events_by_themes():
    result = db.session.query(
        EventThemes.theme_id,
        EventThemes.name.label('theme_name'),
        cast(db.func.group_concat(
            func.json_object(
                'id',Events.event_id,
                'name', Events.name,
                'description', Events.description
            )
        ), String).label('event_list')
    ).join(
        ThemedEvents, EventThemes.theme_id == ThemedEvents.theme_id
    ).join(
        Events, ThemedEvents.event_id == Events.event_id
    ).group_by(EventThemes.theme_id, EventThemes.name).all()

    themed_events = []
    for theme_id, theme_name, event_list_str in result:
        events = json.loads(f"[{event_list_str.replace('},{', '},{')}]")
        themed_events.append({'theme_id': theme_id, 'theme_name': theme_name, 'events': events})

    return json.dumps(themed_events)

"""
Get Themes by Events
Endpoint: /api/event/themes/all
Method: GET
Description: Retrieve themes associated with each event.
Response:
200 OK: List of events with their associated themes.
"""
@app.route('/api/event/themes/all')
def get_themes_by_events():
    result = db.session.query(
        ThemedEvents.event_id,
        db.func.group_concat(EventThemes.name).label('theme_names')
    ).join(
        EventThemes,
        ThemedEvents.theme_id == EventThemes.theme_id
    ).group_by(ThemedEvents.event_id).all()
    themed_events = [{'event_id': event_id, 'theme_names': theme_names.split(',')} for event_id, theme_names in result]
    return json.dumps(themed_events)


"""
Get Event Perks
Endpoint: /api/event/perks
Method: GET
Description: Retrieve a list of all event perks.
Response:
200 OK: List of perks with details.
"""
@app.route('/api/event/perks')
def get_event_perks():
    all_perks = EventPerks.query.all()
    perk_list = []
    for perk in all_perks:
        perk_dict = {
            'id': perk.perk_id,
            'name': perk.name,
        }
        perk_list.append(perk_dict)
    return json.dumps({'perks': perk_list})


"""
Get Perks by Event
Endpoint: /api/event/perks/all
Method: GET
Description: Retrieve perks associated with each event.
Response:
200 OK: List of events with their associated perks.
"""
@app.route('/api/event/perks/all')
def get_perks_by_event():
    result = db.session.query(
        PerkedEvents.event_id,
        db.func.group_concat(EventPerks.name).label('perk_names')
    ).join(
        EventPerks,
        PerkedEvents.perk_id == EventPerks.perk_id
    ).group_by(PerkedEvents.event_id).all()
    perked_events = [{'event_id': event_id, 'perk_names': perk_names.split(',')} for event_id, perk_names in result]
    return json.dumps(perked_events)


"""
Get Events by Perks
Endpoint: /api/event/perked/all
Method: GET
Description: Retrieve events grouped by their perks.
Response:
200 OK: List of perked events with details.
"""
@app.route('/api/event/perked/all')
def get_events_by_perks():
    result = db.session.query(
        EventPerks.perk_id,
        EventPerks.name.label('perk_name'),
        cast(db.func.group_concat(
            func.json_object(
                'id',Events.event_id,
                'name', Events.name,
                'description', Events.description
            )
        ), String).label('event_list')
    ).join(
        PerkedEvents, EventPerks.perk_id == PerkedEvents.perk_id
    ).join(
        Events, PerkedEvents.event_id == Events.event_id
    ).group_by(EventPerks.perk_id, EventPerks.name).all()

    perked_events = []
    for perk_id, perk_name, event_list_str in result:
        events = json.loads(f"[{event_list_str.replace('},{', '},{')}]")
        perked_events.append({'perk_id': perk_id, 'perk_name': perk_name, 'events': events})

    return json.dumps(perked_events)


"""
Get Organizations
Endpoint: /api/organization/all
Method: GET
Description: Retrieve a list of all organizations.
Response:
200 OK: List of organizations with details.
"""
@app.route('/api/organization/all')
def get_organizations():
    all_orgs = Organizations.query.all()
    org_list = []
    for org in all_orgs:
        org_dict = {
            'id': org.org_id,
            'image_id': org.image_id,
            'name': org.name,
            'about': org.about,
            'contact': org.contact,
            'faq': org.faq,
        }
        org_list.append(org_dict)
    return json.dumps({'orgs': org_list})


"""
Get Organization Details
Endpoint: /api/organization/<id>
Method: GET
Description: Retrieve details of a specific organization.
Parameters:
id (String): Organization ID.
Response:
200 OK: Details of the organization.
"""
@app.route('/api/organization/<id>')
def get_organization(id):
    org = Organizations.query.filter_by(org_id=id).first()
    if org:
        org_details = {
       'org_id': org.org_id,
       'image_id': org.image_id,
            'name': org.name,
            'about': org.about,
            'contact': org.contact,
            'faq': org.faq,
    }
        return json.dumps({'org': org_details})
    else:
        return json.dumps({'error': 'Organization not found'})
   
"""
Get Joined Organizations for a User
Endpoint: /api/organization/joined/<uid>
Method: GET
Description: Retrieve organizations joined by a specific user.
Parameters:
uid (String): User ID.
Response:
200 OK: List of organizations joined by the user.
"""
@app.route('/api/organization/joined/<uid>', methods=['GET'])
def get_joined_organizations(uid):
    org_data = db.session.query(
        JoinedOrganizations.org_id, Organizations.name
    ).join(
        Organizations, Organizations.org_id == JoinedOrganizations.org_id
    ).filter(
        JoinedOrganizations.user_id == uid
    ).all()
    orgs = []
    for org in org_data:
        org_id, name = org
        org_dict = {
            'id': org_id,
            'name': name,
        }
        orgs.append(org_dict)
    return json.dumps({'user': uid, 'orgs': orgs})


"""
Add Member to Organization
Endpoint: /api/organization/joined/add/
Method: POST
Description: Add a user as a member to a specific organization.
Request Body:
uid (String): User ID.
org_id (String): Organization ID.
Response:
200 OK: Success message if the member is added successfully.
"""
@app.route('/api/organization/joined/add/', methods=['POST'])
def add_member_to_org():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    org_id = data['org_id']
    attendee = JoinedOrganizations(user_id = uid, org_id = org_id)
    account = JoinedOrganizations.query.filter(
        and_(JoinedOrganizations.user_id==uid,
             JoinedOrganizations.org_id==org_id
        )
    ).first()
    if account is None:
        db.session.add(attendee)
        db.session.commit()
        return json.dumps({'success': True, 'uid': uid, 'org_id': org_id})
    else:
        return json.dumps({'relation already exists': True})
   

"""
Remove Member from Organization
Endpoint: /api/organization/joined/remove/
Method: POST
Description: Remove a user as a member from a specific organization.
Request Body:
uid (String): User ID.
org_id (String): Organization ID.
Response:
200 OK: Success message if the member is removed successfully.
"""
@app.route('/api/organization/joined/remove/', methods=['POST'])
def remove_member_from_org():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    org_id = data['org_id']
    member = JoinedOrganizations.query.filter(
        and_(JoinedOrganizations.user_id==uid,
             JoinedOrganizations.org_id==org_id
        )
    ).first()
    if member is not None:
        db.session.delete(member)
        db.session.commit()
        return json.dumps({'message': 'Member removed successfully'})
    else:
        return json.dumps({'message': 'Member does not exist.'})


"""
Get Organization Members
Endpoint: /api/organization/members/<org_id>
Method: GET
Description: Retrieve the list of users who are members of a specific organization.
Parameters:
org_id (String): Organization ID.
Response:
200 OK: List of user IDs who are members of the organization.
"""
@app.route('/api/organization/members/<org_id>', methods=['GET'])
def get_organization_members(org_id):
    user_ids = JoinedOrganizations.query.filter_by(org_id=org_id).with_entities(JoinedOrganizations.user_id).all()
    users = [user_id[0] for user_id in user_ids]
    return json.dumps({'org': org_id, 'members': users})

"""
Get Organization Categories
Endpoint: /api/organization/categories
Method: GET
Description: Retrieve a list of all organization categories.
Response:
200 OK: List of organization categories with details
"""
@app.route('/api/organization/categories')
def get_organization_categories():
    all_categories = OrganizationCategories.query.all()
    cat_list = []
    for cat in all_categories:
        cat_dict = {
            'id': cat.category_id,
            'name': cat.name,
        }
        cat_list.append(cat_dict)
    return json.dumps({'categories': cat_list})


"""
Get Organizations by Categories
Endpoint: /api/organization/categorized/all
Method: GET
Description: Retrieve organizations grouped by categories.
Response:
200 OK: List of categorized organizations with details.
"""
@app.route('/api/organization/categorized/all')
def get_orgs_by_categories():
    result = db.session.query(
        OrganizationCategories.category_id,
        OrganizationCategories.name.label('category_name'),
        db.func.group_concat(
            func.json_object(
                'id',Organizations.org_id,
                'name', Organizations.name,
                'about', Organizations.about
            )
        ).label('org_list')
    ).join(
        CategorizedOrganizations, OrganizationCategories.category_id == CategorizedOrganizations.category_id
    ).join(
        Organizations, CategorizedOrganizations.org_id == Organizations.org_id
    ).group_by(OrganizationCategories.category_id, OrganizationCategories.name).all()

    categorized_orgs = []
    for category_id, category_name, org_list_str in result:
        orgs = json.loads(f"[{org_list_str.replace('},{', '},{')}]")
        categorized_orgs.append({'category_id': category_id, 'category_name': category_name, 'orgs': orgs})
   
    return json.dumps(categorized_orgs)


"""
Get Categories by Organization
Endpoint: /api/organization/categories/all
Method: GET
Description: Retrieve categories associated with each organization.
Response:
200 OK: List of organizations with associated category names.
"""
@app.route('/api/organization/categories/all')
def get_categories_by_org():
    result = db.session.query(
        CategorizedOrganizations.org_id,
        db.func.group_concat(OrganizationCategories.name).label('category_names')
    ).join(
        OrganizationCategories,
        CategorizedOrganizations.category_id == OrganizationCategories.category_id
    ).group_by(CategorizedOrganizations.org_id).all()
    categorized_orgs = [{'org_id': org_id, 'category_names': category_names.split(',')} for org_id, category_names in result]
    return json.dumps(categorized_orgs)



"""
Get All Events from an Organization
Endpoint: /api/organization/events/<id>
Method: GET
Description: Retrieve all events hosted by a specific organization.
Parameters:
id (String): Organization ID.
Response:
200 OK: List of event IDs hosted by the organization.
"""
@app.route('/api/organization/events/<id>')
def get_all_events_from_org(id):
    events = EventHosts.query.filter_by(org_id=id).with_entities(EventHosts.event_id).all()
    try:
        if not events:
            return json.dumps({'message': 'No events'})
        event_list = [event[0] for event in events]
        return json.dumps({'events': event_list})
    except Exception as e:
        return json.dumps({'error': str(e)}), 500


"""
Get Organizations Joined by Followees
Endpoint: /api/organization/joined/followees/<uid>
Method: GET
Description: Retrieve organizations joined by users followed by a specific user.
Parameters:
uid (String): User ID.
Response:
200 OK: List of organizations joined by followees of the user.
"""
@app.route('/api/organization/joined/followees/<uid>')
def orgs_joined_by_followees(uid):
    result = db.session.query(
        Organizations.org_id, Organizations.name.label('org_name')
    ).join(
        JoinedOrganizations, JoinedOrganizations.org_id == Organizations.org_id
    ).join(
        Follows, Follows.followee_id == JoinedOrganizations.user_id
    ).filter(
        Follows.follower_id == uid
    ).distinct().all()
    orgs_joined = [{'org_id': org[0], 'org_name': org[1]} for org in result]
    return json.dumps({'uid': uid, 'orgs': orgs_joined})


"""
Add User
Endpoint: /api/users/add/
Method: POST
Description: Add a new user.
Request:
JSON Payload:
    {
  "uid": "user123",
  "netid": "netid123",
  "firstName": "John",
  "lastName": "Doe",
  "isOfficer": true,
  "organization": "OrganizationXYZ"
}

Response:
200 OK: User added successfully.
"""
@app.route('/api/users/add/', methods=['POST'])
def add_user():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    netid = data['netid']
    firstname = data['firstName']
    lastname = data['lastName']
    isOfficer = 1 if data['isOfficer'] else 0
    organization = data['organization']
    user = Users(user_id=uid, netid=netid, username=netid, firstname=firstname, lastname=lastname, isOfficer=isOfficer, organization=organization)
    account = Users.query.filter_by(user_id=uid).first()
    if account is None:
        db.session.add(user)
        db.session.commit()
        return json.dumps({'success': True, 'uid': uid, 'netid': netid, 'firstName': firstname, 'lastName': lastname, 'isOfficer': isOfficer, 'organization': organization})
    else:
        return json.dumps({'account already exists': True})


"""
Get All Users
Endpoint: /api/users/all
Method: GET
Description: Retrieve a list of all users.
Response:
200 OK: List of users with details.
"""
@app.route('/api/users/all')
def get_users():
    all_users = Users.query.all()
    user_list = []
    for user in all_users:
        user_dict = {
            'user_id': user.user_id,
            'netid': user.netid,
            'username': user.username,
            'bio_descrip': user.bio_descrip,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'isOfficer': user.isOfficer,
            }
        user_list.append(user_dict)
    return json.dumps({'users': user_list})



"""
Get User by ID
Endpoint: /api/users/<uid>
Method: GET
Description: Retrieve user details by user ID.
Parameters:
uid (String): User ID.
Response:
200 OK: Details of the user.
"""
@app.route('/api/users/<uid>')
def get_user(uid):
    user  = Users.query.filter_by(user_id=uid).first()
    if user:
        user_info = {
            'user_id': user.user_id,
            'netid': user.netid,
            'username': user.username,
            'bio_descrip': user.bio_descrip,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'isOfficer': user.isOfficer,
            'organization': user.organization,
            }
        return json.dumps({'user': user_info})
    else:
        return json.dumps({'error': 'User not found'})



"""
Update User Bio
Endpoint: /api/users/changeBio
Method: POST
Description: Update the bio description of a user.
Request:
JSON Payload:
    {
  "uid": "user123",
  "newBio": "New user bio description."
    }
Response:
200 OK: Bio updated successfully.
"""
@app.route('/api/users/changeBio', methods=['POST'])
def update_bio():
   data = request.get_data()
   data = json.loads(data)
   uid = data['uid']
   newBio = data['newBio']
   user = Users.query.filter_by(user_id=uid).first()
   if user:
       user.bio_descrip = newBio
       db.session.commit()
       return json.dumps({'success': True})
   else:
       return json.dumps({'error': 'User not found'})



"""
Get Users Followed by a User
Endpoint: /api/users/follows/<uid>
Method: GET
Description: Retrieve users followed by a specific user.
Parameters:
uid (String): User ID.
Response:
200 OK: List of users followed by the specified user.
"""
@app.route('/api/users/follows/<uid>')
def follows(uid):
    follows_data = db.session.query(
        Follows.followee_id, Users.firstname, Users.lastname
    ).join(
        Users, Users.user_id == Follows.followee_id
    ).filter(
        Follows.follower_id == uid
    ).all()
    follows = []
    for followee in follows_data:
        followee_id, first_name, last_name = followee
        followee_dict = {
            'uid': followee_id,
            'name': first_name + ' ' + last_name,
        }
        follows.append(followee_dict)
    return json.dumps({'follower': uid, 'follows': follows})


"""
Get Followers of a User
Endpoint: /api/users/followers/<uid>
Method: GET
Description: Retrieve followers of a specific user.
Parameters:
uid (String): User ID.
Response:
200 OK: List of users following the specified user.
"""
@app.route('/api/users/followers/<uid>')
def followers(uid):
    followers_data = db.session.query(
        Follows.follower_id, Users.firstname, Users.lastname
    ).join(
        Users, Users.user_id == Follows.follower_id
    ).filter(
        Follows.followee_id == uid
    ).all()
    followers = []
    for follower in followers_data:
        follower_id, first_name, last_name = follower
        follower_dict = {
            'uid': follower_id,
            'name': first_name + ' ' + last_name if first_name is not None else 'hello',
        }
        followers.append(follower_dict)
    return json.dumps({'followee': uid, 'followers': followers})


"""
Follow User
Endpoint: /api/users/follow/
Method: POST
Description: Follow a user.
Request:
JSON Payload:
    {
  "follower_uid": "follower123",
  "followee_uid": "followee456"
    }
Response:
200 OK: Followed successfully.
"""
@app.route('/api/users/follow/', methods=['POST'])
def follow_user():
    data = request.get_data()
    data = json.loads(data)
    follower = data['follower_uid']
    follow = data['followee_uid']
    follows = Follows(follower_id = follower, followee_id = follow)
    relationship = Follows.query.filter(
        and_(Follows.follower_id==follower,
             Follows.followee_id==follow
        )
    ).first()
    if relationship is None:
        db.session.add(follows)
        db.session.commit()
        return json.dumps({'success': True, 'follower': follower, 'followee': follow})
    else:
        return json.dumps({'relation already exists': True})


"""
Unfollow User
Endpoint: /api/users/unfollow/
Method: POST
Description: Unfollow a user.
Request:
JSON Payload:
    {
  "follower_id": "follower123",
  "followee_id": "followee456"
    }
Response:
200 OK: Unfollowed successfully.
"""
@app.route('/api/users/unfollow/', methods=['POST'])
def unfollow_user():
    data = request.get_data()
    data = json.loads(data)
    follower_uid = data['follower_id']
    followee_uid = data['followee_id']
    relationship = Follows.query.filter(
        and_(Follows.follower_id==follower_uid,
             Follows.followee_id==followee_uid
        )
    ).first()
    if relationship is not None:
        db.session.delete(relationship)
        db.session.commit()
        return json.dumps({'message':'Unfollowed successfully.'})
    else:
        return json.dumps({'message': 'Never followed this user.'})


"""
Add Event Perk Preferences
Endpoint: /api/event/perk/preference/add/
Method: POST
Description: Add preferences for event perks for a user.
Request:
JSON Payload:
    {
  "uid": "user123",
  "perk_ids": ["perk_id1", "perk_id2", ...]
    }
Response:
200 OK: Preferences added successfully.
"""
@app.route('/api/event/perk/preference/add/', methods=['POST'])
def add_event_perk_pref():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    perk_ids = data['perk_ids']
    if uid and perk_ids:
        try:
            for perk_id in perk_ids:
                pref = PreferredEventPerks.query.filter(
                    and_(PreferredEventPerks.user_id==uid,
                        PreferredEventPerks.perk_id==perk_id
                    )
                ).first()
                if pref is None:
                    perk_pref = PreferredEventPerks(user_id=uid, perk_id=perk_id)
                    db.session.add(perk_pref)
                   
            db.session.commit()
            return json.dumps({'success': True, 'uid': uid, 'perk_ids': perk_ids})

        except Exception as e:
            print('error: ', e)
            return json.dumps({'message': 'error'}), 500

    return json.dumps({'error': 'no user or no perks'}), 400


"""
Recommend Events by Perk Preferences
Endpoint: /api/events/perk/preference/<uid>
Method: GET
Description: Get recommended events based on user's perk preferences.
Parameters:
uid (String): User ID.
Response:
200 OK: List of recommended events.
"""
@app.route('/api/events/perk/preference/<uid>')
def recommend_events_by_perk(uid):
    all_events = db.session.query(
        Events.event_id, Events.name
    ).join(
        PerkedEvents, PerkedEvents.event_id == Events.event_id
    ).join(
        PreferredEventPerks, PreferredEventPerks.perk_id == PerkedEvents.perk_id
    ).filter(PreferredEventPerks.user_id == uid).distinct().all()

    events = []
    for event in all_events:
        event_dict = {
            'id': event[0],
            'name': event[1],
        }
        events.append(event_dict)

    return json.dumps({'events': events})


"""
Add Event Theme Preferences
Endpoint: /api/event/theme/preference/add/
Method: POST
Description: Add preferences for event themes for a user.
Request:
JSON Payload:
    {
  "uid": "user123",
  "theme_ids": ["theme_id1", "theme_id2", ...]
    }
Response:
200 OK: Preferences added successfully.
"""
@app.route('/api/event/theme/preference/add/', methods=['POST'])
def add_event_theme_pref():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    theme_ids = data['theme_ids']
    if uid and theme_ids:
        try:
            for theme_id in theme_ids:
                pref = PreferredEventThemes.query.filter(
                    and_(PreferredEventThemes.user_id==uid,
                        PreferredEventThemes.theme_id==theme_id
                    )
                ).first()
                if pref is None:
                    theme_pref = PreferredEventThemes(user_id=uid, theme_id=theme_id)
                    db.session.add(theme_pref)
                   
            db.session.commit()
            return json.dumps({'success': True, 'uid': uid, 'theme_ids': theme_ids})

        except Exception as e:
            print('error: ', e)
            return json.dumps({'message': 'error'}), 500

    return json.dumps({'error': 'no user or no theme'}), 400


"""
Recommend Events by Theme Preferences
Endpoint: /api/events/theme/preference/<uid>
Method: GET
Description: Get recommended events based on user's theme preferences.
Parameters:
uid (String): User ID.
Response:
200 OK: List of recommended events.
"""
@app.route('/api/events/theme/preference/<uid>')
def recommend_events_by_theme(uid):
    all_events = db.session.query(
        Events.event_id, Events.name
    ).join(
        ThemedEvents, ThemedEvents.event_id == Events.event_id
    ).join(
        PreferredEventThemes, PreferredEventThemes.theme_id == ThemedEvents.theme_id
    ).filter(PreferredEventThemes.user_id == uid).distinct().all()

    events = []
    for event in all_events:
        event_dict = {
            'id': event[0],
            'name': event[1],
        }
        events.append(event_dict)

    return json.dumps({'events': events})


"""
Add Event Category Preferences
Endpoint: /api/event/category/preference/add/
Method: POST
Description: Add preferences for event categories for a user.
Request:
JSON Payload:
    {
  "uid": "user123",
  "category_ids": ["category_id1", "category_id2", ...]
    }
Response:
200 OK: Preferences added successfully.
"""
@app.route('/api/event/category/preference/add/', methods=['POST'])
def add_event_category_pref():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    category_ids = data['category_ids']
    if uid and category_ids:
        try:
            for category_id in category_ids:
                pref = PreferredEventCategories.query.filter(
                    and_(PreferredEventCategories.user_id==uid,
                        PreferredEventCategories.category_id==category_id
                    )
                ).first()
                if pref is None:
                    cat_pref = PreferredEventCategories(user_id=uid, category_id=category_id)
                    db.session.add(cat_pref)
                   
            db.session.commit()
            return json.dumps({'success': True, 'uid': uid, 'category_ids': category_ids})

        except Exception as e:
            print('error: ', e)
            return json.dumps({'message': 'error'}), 500

    return json.dumps({'error': 'no user or no theme'}), 400



"""
Recommend Events by Category Preferences
Endpoint: /api/events/category/preference/<uid>
Method: GET
Description: Get recommended events based on user's category preferences.
Parameters:
uid (String): User ID.
Response:
200 OK: List of recommended events.
"""
@app.route('/api/events/category/preference/<uid>')
def recommend_events_by_category(uid):
    all_events = db.session.query(
        Events.event_id, Events.name
    ).join(
        CategorizedEvents, CategorizedEvents.event_id == Events.event_id
    ).join(
        PreferredEventCategories, PreferredEventCategories.category_id == CategorizedEvents.category_id
    ).filter(PreferredEventCategories.user_id == uid).distinct().all()

    events = []
    for event in all_events:
        event_dict = {
            'id': event[0],
            'name': event[1],
        }
        events.append(event_dict)

    return json.dumps({'events': events})


"""
Add Organization Category Preferences
Endpoint: /api/organization/category/preference/add/
Method: POST
Description: Add preferences for organization categories for a user.
Request:
JSON Payload:
    {
  "uid": "user123",
  "category_ids": ["category_id1", "category_id2", ...]
    }
Response:
200 OK: Preferences added successfully.
"""
@app.route('/api/organization/category/preference/add/', methods=['POST'])
def add_org_category_pref():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    category_ids = data['category_ids']
    if uid and category_ids:
        try:
            for category_id in category_ids:
                pref = PreferredOrganizationCategories.query.filter(
                    and_(PreferredOrganizationCategories.user_id==uid,
                        PreferredOrganizationCategories.category_id==category_id
                    )
                ).first()
                if pref is None:
                    cat_pref = PreferredOrganizationCategories(user_id=uid, category_id=category_id)
                    db.session.add(cat_pref)
                   
            db.session.commit()
            return json.dumps({'success': True, 'uid': uid, 'category_ids': category_ids})

        except Exception as e:
            print('error: ', e)
            return json.dumps({'message': 'error'}), 500

    return json.dumps({'error': 'no user or no theme'}), 400



"""
Recommend Organizations by Category Preferences
Endpoint: /api/organization/category/preference/<uid>
Method: GET
Description: Get recommended organizations based on user's category preferences.
Parameters:
uid (String): User ID.
Response:
200 OK: List of recommended organizations.
"""
@app.route('/api/organization/category/preference/<uid>')
def recommend_orgs_by_category(uid):
    all_orgs = db.session.query(
        Organizations.org_id, Organizations.name
    ).join(
        CategorizedOrganizations, CategorizedOrganizations.org_id == Organizations.org_id
    ).join(
        PreferredOrganizationCategories, PreferredOrganizationCategories.category_id == CategorizedOrganizations.category_id
    ).filter(PreferredOrganizationCategories.user_id == uid).distinct().all()

    orgs = []
    for org in all_orgs:
        org_dict = {
            'id': org[0],
            'name': org[1],
        }
        orgs.append(org_dict)

    return json.dumps({'orgs': orgs})



"""
Update Organization About Information
Endpoint: /api/officers/change/about/
Method: POST
Description: Update the "About" information of an organization (only accessible by officers).
Request:
JSON Payload:
    {
  "uid": "user123",
  "org_id": "org_id1",
  "newAbout": "New about information for the organization."
    }
Response:
200 OK: About information updated successfully.
"""
@app.route('/api/officers/change/about/', methods=['POST'])
def update_org_about():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    org_id = data['org_id']
    new_about = data['newAbout']
    user = Users.query.filter_by(user_id=uid).first()
    if user and user.organization == org_id:
        org = Organizations.query.filter_by(org_id=org_id).first()
        print(org)
        if org:
            org.about = new_about
            db.session.commit()
            return json.dumps({'success': True})
        else:
            return json.dumps({'error': 'Organization not found'})
    else:
        return json.dumps({'error': 'User not found or user is not officer of this organization'})



"""
Update Organization Contact Information
Endpoint: /api/officers/change/contact/
Method: POST
Description: Update the contact information of an organization (only accessible by officers).
Request:
JSON Payload:
    {
  "uid": "user123",
  "org_id": "org_id1",
  "newContact": "New contact information for the organization."
    }
Response:
200 OK: Contact information updated successfully.
"""
@app.route('/api/officers/change/contact/', methods=['POST'])
def update_org_contact():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    org_id = data['org_id']
    new_contact = data['newContact']
    user = Users.query.filter_by(user_id=uid).first()
    if user and user.organization == org_id:
        org = Organizations.query.filter_by(org_id=org_id).first()
        if org:
            org.contact = new_contact
            db.session.commit()
            return json.dumps({'success': True})
        else:
            return json.dumps({'error': 'Organization not found'})
    else:
        return json.dumps({'error': 'User not found or user is not officer of this organization'})

# Check if the script is being run directly (not imported as a module)
if __name__ == '__main__':
    # Start the Flask application in debug mode
    # Debug mode allows for automatic reloading of the server upon code changes
    app.run(debug=True)
