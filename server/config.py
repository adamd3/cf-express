import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, 'config.env'))

class Config:
    ENV = os.environ.get('FLASK_ENV') or 'development'
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URI') or 'postgresql://<username>:<password>@<host>/<dbname>'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
