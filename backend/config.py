import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.flaskenv'))
load_dotenv(os.path.join(basedir, '.env'))
#APP_ROOT = os.path.abspath(os.path.abspath(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'temporary_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    
    
    PROFILE_IMAGE_FOLDER = os.path.join(basedir, 'app/static/images')
    DEBUG=True
    MAIL_SERVER=os.environ['MAIL_SERVER'],
    MAIL_PORT = os.environ['MAIL_PORT'],
    MAIL_USE_SSL = os.environ['MAIL_USE_SSL'],
    MAIL_USERNAME = os.environ['MAIL_USERNAME'],
    MAIL_PASSWORD = os.environ['MAIL_PASSWORD']
