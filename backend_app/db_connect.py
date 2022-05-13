from pymongo import MongoClient
from bson import json_util
import time
# client = MongoClient('mongodb://root:rootpassword@0.0.0.0:27017/')
# client = MongoClient('mongodb://root:rootpassword@mongodb_host:27017/')

client = MongoClient(host='mongodb_host',
                        port=27017, 
                        username='root', 
                        password='rootpassword',
                    authSource="admin")

database = client['todos']
collection = database['user']

def parse_json(data):
    data = json_util.dumps(data)
    return json_util.loads(json_util.dumps(data))

def get_items():
    #To slow the process
    r = parse_json(collection.find().sort('task',1).sort('time_hr',1))
    [i for i in r]
    time.sleep(2)
    return r

def insert_one(mydict):
    x = collection.insert_one(mydict)
    return x

def insert_many(mydict_list):
    x = collection.insert_many(mydict_list)
    return x

# mydict = { "task": "flask apis and dockerize", "time_hr": 4 }
# print(insert_task(mydict))
