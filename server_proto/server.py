from flask import Flask, request, session, jsonify
from flask_bcrypt import Bcrypt
import pymongo
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import uuid

app = Flask(__name__)
bcrypt=Bcrypt(app)

app.config['SECRET_KEY']='chickenmutton'
jwt=JWTManager(app)

client = pymongo.MongoClient('localhost', 27017)

db = client.classroom_allocation
collection = db.users
col_room_allocs = db.room_allocs
col_room_reqs = db.room_reqs

# collection.create_index([('user_id', 'text')], unique=True)

@app.route("/register", methods=['POST'])
def register():
	(username, password, role) = request.json.values()

	if not username or not password or not role:
		return {'message': 'Missing email/password/role!'}, 400
	
	hashed=bcrypt.generate_password_hash(password).decode('utf-8')

	try:
		_id=collection.insert_one({"user_id": username, "password": hashed, "role": role}).inserted_id
	except pymongo.errors.DuplicateKeyError:
		return {'message': 'A user with this ID already exists'}
	
	access_token = create_access_token(identity=username)
	return {'id': str(_id), 'access_token': access_token, 'role': role}


@app.route("/login", methods=['POST'])
def login():
	# if (session.get('user_id')):
	# 	print('already logged in')
	# 	return {'id': str(session.get('user_id'))}
	(username, password) = request.json.values()
	
	if not username or not password:
		return {'message': 'Missing email/password!'}, 400
	
	found_user=collection.find_one({"user_id": username})

	if not found_user:
		return {'message': 'User not found!'}
	
	auth=bcrypt.check_password_hash(found_user['password'], password)
	if auth: 
		print('Logged in successfully')
		access_token = create_access_token(identity=username)
		return {'id': str(found_user['user_id']), 'access_token': access_token, 'role': found_user['role']}
	else:
		return {'message': 'Wrong password'}


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
	# Access the identity of the current user with get_jwt_identity
	current_user = get_jwt_identity()
	return {'logged_in_as': current_user}, 200

@app.route("/schedule", methods=["GET"])
def get_schedule():
	try:
		schedule = col_room_allocs.find()

		all_schedules = {}

		for date in list(schedule):
			for key in date.keys():
				if key != "_id":
					all_schedules[key] = date[key]

		return jsonify(all_schedules)

	except:
		return jsonify({"message": "Something bad happened :("}), 400

@app.route("/schedule", methods=["POST"])
def get_filtered_schedule():
	# TODO: implement this 
	return jsonify({"message": "Test works, ez :)"})

@app.route("/user/alloc_room", methods=["POST"])
def user_alloc_room():
	user_params = request.json
	
	try:
		date_schdl = col_room_allocs.find({user_params["date"]: {"$exists": True}})

		if not list(date_schdl):
			new_scdl = {
				user_params["date"]: {
					user_params["slot"]:
					{
						user_params["room"]: {
							'available': False,
							'assignedTo': user_params['username'],
							'requestID': str(uuid.uuid4())[:8]
						}
					}
				}
			}
			col_room_allocs.insert_one(new_scdl)

		else:
			date_data = col_room_allocs.find()
			date_data = list(date_data)
			for date in date_data:
				if user_params["date"] in date.keys():
					col_room_allocs.delete_one(date)
					
					new_entry = {
						user_params["room"]: {
							'available': False,
							'assignedTo': user_params['username'],
							'requestID': user_params["requestID"]
						}
					}

					updated_schdl = {
						user_params["date"]: {}
					}

					# Old keys
					for key in date:
						if key != "_id":
							for sub_key in date[key]:
								updated_schdl[user_params["date"]][sub_key] = date[key][sub_key]

					updated_schdl[user_params["date"]][user_params["slot"]] = new_entry
					
					col_room_allocs.insert_one(updated_schdl)

					break

	except Exception as e:
		print(f"something bad happened: {e}")
		return jsonify({"message": "Missing params!"}), 400

	return jsonify({"message": "Test works, ez :)"})

@app.route("/user/requests", methods=["POST"])
@jwt_required()
def make_req():
	current_user = get_jwt_identity()
	user_params = request.json

	try:
		keys = ["username", "access_token", "room", "slot", "date"]

		for key in keys:
			if key not in user_params.keys():
				return jsonify({"message": "Missing params!"}), 400

		user_params["requestID"] = str(uuid.uuid4())[:8]
		
		col_room_reqs.insert_one(user_params)
		all_user_reqs = col_room_reqs.find({"username" : user_params["username"]})

		user_reqs = {}

		for entry in all_user_reqs:
			user_reqs[entry["requestID"]] = {
				"slot": entry["slot"],
				"date": entry["date"],
				"room": entry["room"]
			}

		return jsonify(user_reqs)
	
	except:
		return jsonify({"message": "Missing params!"}), 400