from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import PrimaryKeyConstraint
from sqlalchemy import and_
import json
import dotenv
import os

dotenv.load_dotenv()

db = SQLAlchemy()
app = Flask(__name__)

username = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
userpass = 'mysql+pymysql://' + username + ':' + password + '@'
server = os.getenv("DB_HOST")
dbname   = os.getenv("DB_NAME")

app.config['SQLALCHEMY_DATABASE_URI'] = userpass + server + dbname
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db.init_app(app)

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
    
class AttendingEvents(db.Model):
    __tablename__ = 'AttendingEvents'

    event_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'user_id'),
    )

class EventPerks(db.Model):
    __tablename__ = 'EventPerks'

    perk_id = db.Column(db.String(25), primary_key=True)
    name = db.Column(db.String(20), nullable=False)

class PerkedEvents(db.Model):
    __tablename__ = 'PerkedEvents'

    event_id = db.Column(db.Integer, primary_key=True)
    perk_id = db.Column(db.String(25), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'perk_id'),
    )

class EventThemes(db.Model):
    __tablename__ = 'EventThemes'

    theme_id = db.Column(db.String(25), primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class ThemedEvents(db.Model):
    __tablename__ = 'ThemedEvents'

    event_id = db.Column(db.Integer, primary_key=True)
    theme_id = db.Column(db.String(25), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'theme_id'),
    )

class EventCategories(db.Model):
    __tablename__ = 'EventCategories'

    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class EventHosts(db.Model):
    __tablename__ = 'EventHosts'

    event_id = db.Column(db.Integer, primary_key=True)
    org_id = db.Column(db.String(200), primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'org_id'),
    )

class CategorizedEvents(db.Model):
    __tablename__ = 'CategorizedEvents'  

    event_id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, primary_key=True)

    __table_args__ = (
        PrimaryKeyConstraint('event_id', 'category_id'),
    )

class Organizations(db.Model):
    __tablename__ = 'Organizations'

    org_id = db.Column(db.String(200), primary_key=True)
    image_id = db.Column(db.String(100))
    name = db.Column(db.String(200))
    about = db.Column(db.Text)
    contact = db.Column(db.Text)
    faq = db.Column(db.Text)

class OrganizationCategories(db.Model):
    __tablename__ = 'OrganizationCategories'

    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    
class JoinedOrganizations(db.Model):
    __tablename__ = 'JoinedOrganizations'
    
    user_id = db.Column(db.String(50), primary_key=True)
    org_id = db.Column(db.String(200), primary_key=True)


    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'org_id'),
    )

class CategorizedOrganizations(db.Model):
    __tablename__ = 'CategorizedOrganizations'

    org_id = db.Column(db.String(200), nullable=True)
    category_id = db.Column(db.Integer, nullable=True)

    __table_args__ = (
        PrimaryKeyConstraint('org_id', 'category_id'),
    )
class Users(db.Model):
    __tablename__ = 'Users'

    user_id = db.Column(db.String(50), primary_key=True)
    netid = db.Column(db.String(50))
    username = db.Column(db.String(50), nullable=False)
    bio_descrip = db.Column(db.Text)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    isOfficer = db.Column(db.Boolean)

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

@app.route('/api/event/<int:id>')
def get_event(id):
    event_data = db.session.query(
        Events, EventHosts.org_id.label('host_org_id')
    ).join(
        EventHosts, Events.event_id == EventHosts.event_id
    ).filter(
        Events.event_id == id
    ).first()

    if event_data:
        print(event_data)
        event, host_org_id = event_data
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
        }
        return json.dumps({'event': event_details})
    else:
        return json.dumps({'error': 'Event not found'})

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

@app.route('/api/event/attending/<uid>', methods=['GET'])
def get_attending_events(uid):
    event_ids = AttendingEvents.query.filter_by(user_id=uid).with_entities(AttendingEvents.event_id).all()
    events = [event_id[0] for event_id in event_ids]
    return json.dumps({'user': uid, 'events': events})

@app.route('/api/event/attending/<int:event_id>', methods=['GET'])
def get_event_attends(event_id):
    user_ids = AttendingEvents.query.filter_by(event_id=event_id).with_entities(AttendingEvents.user_id).all()
    users = [user_id[0] for user_id in user_ids]
    return json.dumps({'event': event_id, 'users': users})

    
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

@app.route('/api/event/themes/all')
def get_themes_by_event():
    result = db.session.query(
        ThemedEvents.event_id,
        db.func.group_concat(EventThemes.name).label('theme_names')
    ).join(
        EventThemes,
        ThemedEvents.theme_id == EventThemes.theme_id
    ).group_by(ThemedEvents.event_id).all()
    themed_events = [{'event_id': event_id, 'theme_names': theme_names.split(',')} for event_id, theme_names in result]
    return json.dumps(themed_events)

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
    
@app.route('/api/organization/joined/<uid>', methods=['GET'])
def get_joined_organizations(uid):
    org_ids = JoinedOrganizations.query.filter_by(user_id=uid).with_entities(JoinedOrganizations.org_id).all()
    orgs = [org_id[0] for org_id in org_ids]
    return json.dumps({'user': uid, 'orgs': orgs})

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

@app.route('/api/organization/members/<org_id>', methods=['GET'])
def get_organization_members(org_id):
    user_ids = JoinedOrganizations.query.filter_by(org_id=org_id).with_entities(JoinedOrganizations.user_id).all()
    users = [user_id[0] for user_id in user_ids]
    return json.dumps({'org': org_id, 'members': users})

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

@app.route('/api/organization/categories/<int:id>', methods=['GET'])
def get_org_ids_by_category(id):
    org_ids = CategorizedOrganizations.query.filter_by(category_id=id).with_entities(CategorizedOrganizations.org_id).all()
    org_id_list = [org_id[0] for org_id in org_ids]
    return json.dumps({'org_ids': org_id_list})

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

@app.route('/api/users/add/', methods=['POST'])
def add_user():
    data = request.get_data()
    data = json.loads(data)
    uid = data['uid']
    netid = data['netid']
    firstname = data['firstName']
    lastname = data['lastName']
    isOfficer = 1 if data['isOfficer'] else 0
    user = Users(user_id=uid, netid=netid, username=netid, firstname=firstname, lastname=lastname, isOfficer=isOfficer)
    account = Users.query.filter_by(user_id=uid).first()
    if account is None:
        db.session.add(user)
        db.session.commit()
        return json.dumps({'success': True, 'uid': uid, 'netid': netid, 'firstName': firstname, 'lastName': lastname, 'isOfficer': isOfficer})
    else:
        return json.dumps({'account already exists': True})

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
            }
        return json.dumps({'user': user_info})
    else:
        return json.dumps({'error': 'User not found'})
    
@app.route('/api/users/netid/<netid>')
def get_user_by_netid(netid):
    user = Users.query.filter_by(netid=netid).first()
    if(user):
        user_info = {
            'user_id': user.user_id,
            'netid': user.netid,
            'username': user.username,
            'bio_descrip': user.bio_descrip,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'isOfficer': user.isOfficer,
            }
        return json.dumps({'user': user_info})
    else:
        return json.dumps({'error': 'User not found'})

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

if __name__ == '__main__':
    app.run(debug=True)
