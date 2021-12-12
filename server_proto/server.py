from flask import Flask, request, session
from flask_bcrypt import Bcrypt
import pymongo
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

app = Flask(__name__)
bcrypt=Bcrypt(app)
CORS(app)

load_dotenv()
db_username=os.environ.get('db_username')
db_password=os.environ.get('db_password')

app.config['SECRET_KEY']='chickenmutton'
jwt=JWTManager(app)

client = pymongo.MongoClient(f"mongodb+srv://{db_username}:{db_password}@cluster0.t20dd.mongodb.net/classroom_allocation?retryWrites=true&w=majority")
db = client.classroom_allocation
collection = db.users

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