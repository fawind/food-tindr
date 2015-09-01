from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException, default_exceptions


app = Flask(__name__)


@app.route('/hello')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello World!'


def make_json_error(ex):
    response = jsonify(message=str(ex))
    response.status_code = (ex.code if isinstance(ex, HTTPException) else 500)
    return response


def make_json_app():
    for code in default_exceptions.iterkeys():
        app.error_handler_spec[None][code] = make_json_error
