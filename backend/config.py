from os import environ, urandom
from datetime import timedelta
from constants import SESSION_LIFETIME, SECRET_KEY

class Config:
    SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URL')
    SECRET_KEY = environ.get(SECRET_KEY, urandom(42).hex())
    CSRF_COOKIE_SECURE = False
    CSRF_COOKIE_SAMESITE = 'Lax'
    WTF_CSRF_ENABLED = False
    SESSION_TYPE = 'sqlalchemy'