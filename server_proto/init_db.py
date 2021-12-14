import pymongo
import datetime

client = pymongo.MongoClient('localhost', 27017)
db = client.classroom_allocation

room_list=[
    ('llt1', 240),
    ('llt2', 240),
    ('sh1', 80),
    ('sh2', 80),
    ('sh3', 80),
    ('sh4', 80),
    ('lt1', 60),
    ('lt2', 60),
    ('lt3', 60),
    ('lt4', 60),
    ('lh1', 45),
    ('lh2', 45),
    ('lh3', 45),
    ('tr1', 30),
    ('tr2', 30),
    ('tr3', 30),
    ('tr4', 30),
    ('tr5', 30),
    ('tr6', 30)
]
dates=base = datetime.datetime.strptime("21-12-2021", "%d-%m-%Y")
date_list = [(base - datetime.timedelta(days=x)).strftime("%d-%m-%Y") for x in range(7)]
date_list.reverse()

time_slots=[f'{x}:00PM-{x+1}:00PM' for x in range(6, 12)]
print(time_slots)
def init_rooms():
    room_collection=db.create_collection('rooms', validator={
    '$jsonSchema': {
            'bsonType': 'object',
            'required': ['name', 'capacity'],
            'properties': {
                'name': {
                    'bsonType': 'string'
                },
                'capacity': {
                    'bsonType': 'int'
                }
            }
        }
    })
    for (room, capacity) in room_list:
        room_collection.insert_one({
            'name': room,
            'capacity': capacity
        })
def init_schedule():
    schedule_collection=db.create_collection('schedule', validator={
     '$jsonSchema': {
            'bsonType': 'object',
            'required': ['date', 'slots'],
            'properties': {
                'date': {
                    'bsonType': 'string'
                },
                'slots': {
                    'bsonType': 'array',
                    'items': {
                        'bsonType': 'object',
                        'required': ['time', 'classroom', 'available', 'assignedTo'],
                        'properties': {
                            'time': {
                                'bsonType': 'string'
                            },
                            'classroom': {
                                'bsonType': 'string'
                            },
                            'available': {
                                'bsonType': 'bool'
                            },
                            'assignedTo': {
                                'bsonType': 'string'
                            }
                        }
                    }
                }
            }
        }
    }
    )
    for date in date_list:
        schedule_collection.insert_one({
        'date': date,
        'slots': [
            {
                'time': '5:00PM-6:00PM',
                'classroom': 'lt6',
                'assignedTo': 'potato',
                'available': False
            }
        ]
        })
        for slot in time_slots:
            for room in room_list:
                new_slot={
                    'time': slot,
                    'classroom': room,
                    'assignedTo': '',
                    'available': True,
                    
                }
                print(new_slot)
                schedule_collection.find_one_and_update(
                    {'date': date}, {'$push': {'slots': new_slot}}
                )

init_rooms()
# init_schedule()