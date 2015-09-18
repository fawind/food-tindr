import logging

from flask import Flask, jsonify, request

from place_finders import NonASCIIJSONEncoder, find_restaurants, find_drinks, \
                          get_details


app = Flask(__name__)
app.json_encoder = NonASCIIJSONEncoder
app.debug = True
logger = logging.getLogger()


@app.errorhandler(500)
def make_json_error(ex):
    response = jsonify(message=str(ex))
    response.status_code = 500
    return response


@app.route('/api/food', methods=['POST'])
def get_restaurants():
    places = find_restaurants(request.get_json(force=True))
    return jsonify(places)


@app.route('/api/drinks', methods=['POST'])
def get_drinks():
    places = find_drinks(request.get_json(force=True))
    return jsonify(places)


@app.route('/api/place/<place_id>', methods=['GET'])
def get_place_details(place_id):
    return jsonify(get_details(place_id))
