from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask import g
from flask_httpauth import HTTPBasicAuth
from flask_login import UserMixin
from app import db, login
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)




recipe_ingredient = db.Table(
    'recipe_ingredient',
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id')),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'))
)

user_ingredient = db.Table(
    'user_ingredient',
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    #token = db.Column(db.String(32), index=True, unique=True)
    created_recipes = db.relationship('Recipe', backref='creator', lazy='dynamic')
    ingredients = db.relationship('Ingredient', secondary=user_ingredient,
                                  primaryjoin=(user_ingredient.c.user_id == id),
                                  backref = db.backref('user_ingredient', lazy='dynamic'),
                                  lazy='dynamic')
    #allergies = db.Column(db.String(140))
    #favorite_recipes = db.relationship('Recipe', foreign_keys='recipe.id')
    def to_dict(self):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'ingredients': [i.to_dict() for i in self.ingredients],
        }
        return data
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expiration = 600):
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        return s.dumps({ 'id': self.id })

    @auth.verify_password
    def verify_password(username_or_token, password):
        user = User.verify_auth_token(username_or_token)
        if not user:
            user = User.query.filter_by(username = username_or_token).first()
            if not user or not user.verify_password(password):
                return False
        g.user = user
        return True

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None
        except BadSignature:
            return None
        user = User.query.get(data['id'])
        return user

   # @login.user_loader
   # def load_user(id):
   #return User.query.get(int(id))

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    ingredients = db.relationship('Ingredient', secondary=recipe_ingredient,
                                  primaryjoin=(recipe_ingredient.c.recipe_id == id),
                                  backref = db.backref('recipe_ingredient', lazy='dynamic'),
                                  lazy='dynamic')
    prep_steps = db.Column(db.Text)
    prep_time = db.Column(db.Integer)
    calories = db.Column(db.Integer)
    carbs = db.Column(db.Integer)
    fat = db.Column(db.Integer)
    protein = db.Column(db.Integer)
    is_vegan = db.Column(db.Boolean, default=False)
    is_vegetarian = db.Column(db.Boolean, default=False)
    is_glutenfree = db.Column(db.Boolean, default=False)

    def to_dict(self):
        data = {
            'id': self.id,
            'name': self.name,
            'creator_id': self.creator_id,
            'date_added': self.timestamp,
            'ingredients': [i.to_dict() for i in self.ingredients],
            'prep_steps': self.prep_steps,
            'prep_time': self.prep_time,
            'calories': self.calories,
            'carbs': self.calories,
            'protein': self.protein,
            'is_vegan': self.is_vegan,
            'is_vegetarian': self.is_vegetarian,
            'is_glutenfree': self.is_glutenfree
        }
        return data

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True, unique=True)
    recipes = db.relationship('Recipe', secondary=recipe_ingredient,
                              primaryjoin=(recipe_ingredient.c.ingredient_id == id),
                              backref=db.backref('recipe_ingredients', lazy='dynamic'),
                              lazy='dynamic')
    def to_dict(self, include_recipes=False):
        data = {
            'id': self.id,
            'name': self.name
        }
        if include_recipes:
            data['recipes'] = [r.id for r in self.recipes]
        return data
        
    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

