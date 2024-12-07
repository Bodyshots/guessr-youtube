from flask import jsonify, request, make_response, Blueprint, session
from flask_wtf.csrf import generate_csrf

from datetime import datetime
from pytz import utc
from datetime import timedelta

from constants import *
from app import db, csrf

main = Blueprint('main', __name__)

# Helper to check authorization
@main.route('/api/health', methods=[GET])
def health_check():
  return make_response(jsonify(status=HEALTHY), OK)