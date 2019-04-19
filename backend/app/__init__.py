from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_httpauth import HTTPBasicAuth
from flask_mail import Mail

from config import Config

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
auth = HTTPBasicAuth()
mail = Mail()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)

    app.config.update(
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=465,
        MAIL_USE_SSL=True,
        MAIL_USERNAME = 'fridge2food@gmail.com',
        MAIL_PASSWORD = 'teamnumber18'
    )

    mail = Mail(app)

    app.config['SECRET_KEY'] = 'just a random string'

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)
    
    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app


from app import models
#from app import routes
