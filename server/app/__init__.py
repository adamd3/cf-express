from config import Config
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import sys

db = SQLAlchemy()

def create_app(config_class=Config):
    app = Flask(__name__)    
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)

    from app import routes
    app.register_blueprint(routes.bp)

    return app, db
