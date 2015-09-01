from flask import Flask, jsonify


app = Flask(__name__)


@app.route('/hello')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello World!'


@app.errorhandler(500)
def make_json_error(ex):
    response = jsonify(message=str(ex))
    response.status_code = 500
    return response
