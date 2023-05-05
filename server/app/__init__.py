from config import Config
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config.from_object(Config)

from app import routes
