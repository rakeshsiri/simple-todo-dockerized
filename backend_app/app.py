from flask import Flask, request, jsonify
from flask_cors import CORS
import db_connect

app = Flask(__name__)
# app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/get_tasks')
def get_tasks():
    return db_connect.get_items()
    

@app.route('/add_task', methods=['POST'])
def add_task():
    print(1)
    mydict = request.get_json()['data']
    db_connect.insert_one(mydict)
    return jsonify([{'status':'Task Details added!'}])

if __name__ == '__main__':
	app.run(host="0.0.0.0", debug=True)

