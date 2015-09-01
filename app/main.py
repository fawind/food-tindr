import logging

from flask import Flask, jsonify, request

from place_handlers import *


app = Flask(__name__)
app.json_encoder = NonASCIIJSONEncoder
app.debug = True
logger = logging.getLogger()




@app.route('/hello')
def hello():
    return jsonify({'message': "Welcome to our website"})


@app.errorhandler(500)
def make_json_error(ex):
    response = jsonify(message=str(ex))
    response.status_code = 500
    return response


@app.route('/api/food', methods=['POST'])
def get_restaurants():
    places = find_restaurants(request.get_json(force=True))
    return jsonify(places)
