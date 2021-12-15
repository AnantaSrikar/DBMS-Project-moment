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
col_room_reqs = db.room_reqs
col_schedule = db.schedule
col_rooms = db.rooms

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

@app.route("/user/requests", methods=["POST"])
@jwt_required()
def make_req():
	current_user = get_jwt_identity()
	user_params = request.json

	try:
		keys = ["username", "room", "slot", "date", "purpose"]

		for key in keys:
			if key not in user_params.keys():
				return jsonify({"message": "Missing params!"}), 400

		new_req = {}

		# Making sure random data doesn't get into database
		for key in keys:
			new_req[key] = user_params[key]
			
		new_req["requestID"] = str(uuid.uuid4())[:8]
		new_req["status"] = "pending"
		
		col_room_reqs.insert_one(new_req)
		all_user_reqs = col_room_reqs.find({"username" : user_params["username"]})

		user_reqs = {}

		for entry in all_user_reqs:
			user_reqs[entry["requestID"]] = {
				"slot": entry["slot"],
				"date": entry["date"],
				"room": entry["room"],
				"status": entry["status"]
			}

		return jsonify(user_reqs)
	
	except Exception as e:
		return jsonify({"message": f"Missing params! {e}"}), 400

@app.route("/user/requests", methods=["GET"])
@jwt_required()
def get_all_reqs():
	current_user = get_jwt_identity()

	try:
		all_user_reqs = col_room_reqs.find({"username" : request.args["username"]})

		user_reqs = {}

		for entry in all_user_reqs:
			print(entry)
			
			user_reqs[entry["requestID"]] = {
				"slot": entry["slot"],
				"date": entry["date"],
				"room": entry["room"],
				"status": entry["status"]
			}

		return jsonify(user_reqs)
	
	except:
		return jsonify({"message": "Missing params!"}), 400

# Route to get ALL the schedules
@app.route("/schedule", methods=["GET"])
def get_schedule():
	try:
		schedule = col_schedule.find()

		all_schedules = []

		for date in list(schedule):
			row = {}
			for key in date.keys():
				if key != "_id":
					row[key] = date[key]
			all_schedules.append(row)

		return jsonify(all_schedules)

	except:
		return jsonify({"message": "Something bad happened :("}), 400

# Route to check for free classrooms as per request
@app.route("/schedule", methods=["POST"])
def get_filtered_schedule():
	user_params = request.json

	keys = ["minCap", "date", "slot"]

	for key in keys:
		if key not in user_params.keys():
			return jsonify({"message": "Missing params!"}), 400

	try:
		free_rooms = []
		# Haha car go vroom vroom
		v_rooms = col_rooms.find({"capacity": {"$gte": user_params["minCap"]}})
		
		date_schdl = col_schedule.find_one({"date": user_params["date"]})
		
		if not date_schdl:
			return jsonify({"message": "Allocations are yet to be done for that day!"}), 400

		for slot in date_schdl["slots"]:
			if slot["time"] == user_params["slot"] and slot["available"]:
				free_rooms.append(slot["classroom"])

		return jsonify(free_rooms)
	
	except Exception as e:
			return jsonify({"message": f"Something bad happened: {e}"})

@app.route("/admin/requests", methods=["POST"])
def get_admin_approval():
	user_params = request.json
	print('1')
	keys = ["requestID", "decision", "username"]
	print('2')
	for key in keys:
		if key not in user_params.keys():
			return jsonify({"message": "Missing params!"}), 400
	print('3')
	try:
		new_req={}
		print('4')
		# Making sure random data doesn't get into database
		for key in keys:
			new_req[key] = user_params[key]
		print('5')
		room_req = col_room_reqs.find_one({"requestID": user_params["requestID"]})
		print('6', user_params)
		if user_params["decision"] == "accept":
			print('7')
			record = col_schedule.find_one({"date": user_params["date"]})
			print('record', record['date'])
			idx = next((i for i, item in enumerate(record['slots']) if item['classroom'] == user_params['room'].lower() and item['time'] == user_params['slot']), None)
			print('idx', idx)
			temp = record['slots']
			print(type(temp))
			temp[idx] = {
				"time": user_params['slot'],
				"classroom": user_params['room'].lower(),
				"assignedTo": user_params['username'],
				"available": False,
				}
			print('ffff')
			col_schedule.update_one({"date": user_params['date']}, {'$set' : {'slots': temp}})
			print('eee')
			col_room_reqs.update_one({"requestID": user_params["requestID"]}, {'$set': {'status': 'accepted'}})

		else:
			col_room_reqs.update_one({"requestID": user_params["requestID"]}, {'$set': {'status': 'denied'}})
		print('-11')
		all_user_reqs_tbl = col_room_reqs.find()
		all_user_reqs = []
		print('00')
		for entry in all_user_reqs_tbl:
			row = {}
			for key in entry.keys():
				if key != "_id":
					row[key] = entry[key]

			all_user_reqs.append((row))
		print('11')

		schedule = col_schedule.find()

		all_schedules = []

		for date in list(schedule):
			row = {}
			for key in date.keys():
				if key != "_id":
					row[key] = date[key]
			all_schedules.append(row)
		print('12')
		return jsonify({"schedule": all_schedules, "requests": all_user_reqs})

	except Exception as e:
		return jsonify({"message": f"Something bad happened: {e}"})

@app.route("/admin/requests", methods=["GET"])
def get_admin_requests():
	try:
		all_user_reqs_tbl = col_room_reqs.find()
		all_user_reqs = []

		for entry in all_user_reqs_tbl:
			row = {}
			for key in entry.keys():
				if key != "_id":
					row[key] = entry[key]

			all_user_reqs.append((row))

		return jsonify(all_user_reqs)
	except Exception as e:
		return jsonify({"message": f"Something bad happened: {e}"})

if __name__ == '__main__':
	app.run(debug=True, port=8080)