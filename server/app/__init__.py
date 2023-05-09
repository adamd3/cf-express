from config import Config
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app(config_class=Config, testing=False):
    app = Flask(__name__)    
    app.config.from_object(config_class)

    if testing:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'


    CORS(app)

    db.init_app(app)

    from app import routes
    app.register_blueprint(routes.bp)

    return app, db
