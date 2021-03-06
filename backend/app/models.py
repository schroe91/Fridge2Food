from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask import g, render_template, url_for
from flask import current_app as app
from flask_httpauth import HTTPBasicAuth
from flask_login import UserMixin
from flask_mail import Message
from app import db, login, auth, mail
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)
import os

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

user_favorite_recipe = db.Table(
    'user_favorite_recipe',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

user_ingredient_allergy = db.Table(
    'user_ingredient_allergy',
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

comment_comment = db.Table(
    'comment_comment',
    db.Column('comcom_id', db.Integer, primary_key=True),
    db.Column('comment_id', db.Integer, db.ForeignKey('comment.id'))
)

recipe_rating = db.Table(
    'recipe_rating',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id')),
    db.Column('rating', db.Integer, db.ForeignKey('rating.id'))
)

comment_likes = db.Table(
    'comment_likes',
    db.Column('like_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('com_id', db.Integer, db.ForeignKey('comment.id'))
)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    #token = db.Column(db.String(32), index=True, unique=True)
    created_recipes = db.relationship('Recipe', backref='creator', lazy='dynamic')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')
    ingredients = db.relationship('Ingredient', secondary=user_ingredient,
                                  primaryjoin=(user_ingredient.c.user_id == id),
                                  backref = db.backref('user_ingredient', lazy='dynamic'),
                                  lazy='dynamic')
    avatar_url = db.Column(db.String(120), default = "/static/images/default.png")
    favorite_recipes = db.relationship('Recipe', secondary=user_favorite_recipe,
                                       primaryjoin=(user_favorite_recipe.c.user_id == id),
                                       backref = db.backref('user_favorite_recipe', lazy='dynamic'),
                                       lazy='dynamic')
    allergies = db.relationship('Ingredient', secondary=user_ingredient_allergy,
                                primaryjoin=(user_ingredient_allergy.c.user_id == id),
                                backref = db.backref('user_ingredient_allergy', lazy='dynamic'),
                                lazy='dynamic')
    def to_dict(self):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'ingredients': [i.to_dict() for i in self.ingredients],
            'avatar_url': self.avatar_url,
            'favorite_recipes': [i.to_dict() for i in self.favorite_recipes],
            'created_recipes': [{'id': r.id,
                                 'name': r.name} for r in self.created_recipes],
            'allergies': [i.to_dict() for i in self.allergies]
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
        print(token)
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

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    recipe = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    user = db.Column(db.Integer, db.ForeignKey('user.id'))
    rating = db.Column(db.Integer)

   
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    content = db.Column(db.String(140))
    com_comments = db.relationship('Comment', secondary=comment_comment, primaryjoin=id == comment_comment.c.comcom_id, backref='comcom')
    #likes = db.relationship('User', secondary=comment_likes, primaryjoin=id == comment_likes.c.com_id, backref='like')

    def get_likes(self):
        likes = {
            'user id': self.id
        }

    def get_data(self):
        com = {
            "comment_id": self.id,
            'user': self.creator,
            'username': User.query.get(self.creator).username,
            'comment': self.content,
            'time': self.timestamp,
            'comments': [c.get_data() for c in self.com_comments]
            #'likes': self.likes
        }
        return com
    
    

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
    meal_type = db.Column(db.String(140))
    image_url = db.Column(db.String(140), default = "/static/images/recipe_default.png")
    #is_breakfast = db.Column(db.Boolean, default=False)
    #is_lunch = db.Column(db.Boolean, default=False)
    #is_dinner = db.Column(db.Boolean, default=False)
    #is_dessert = db.Column(db.Boolean, default=False)
    favorite_count = db.Column(db.Integer, default=0)
    comments = db.relationship('Comment', backref='comment', lazy='dynamic')
    ratings = db.relationship('Rating', secondary=recipe_rating,
                              primaryjoin=(recipe_rating.c.recipe_id == id),
                              backref = db.backref('recipe_rating', lazy='dynamic'),
                              lazy='dynamic')

    def to_dict(self, user=None):
        data = {
            'id': self.id,
            'name': self.name,
            'creator_id': self.creator_id,
            'date_added': self.timestamp,
            'ingredients': [i.to_dict() for i in self.ingredients],
            'prep_steps': self.prep_steps,
            'prep_time': self.prep_time,
            'calories': self.calories,
            'carbs': self.carbs,
            'protein': self.protein,
            'is_vegan': self.is_vegan,
            'is_vegetarian': self.is_vegetarian,
            'is_glutenfree': self.is_glutenfree,
            'favorite_count': self.favorite_count,
            #'is_lunch': self.is_lunch,
            #'is_breakfast': self.is_breakfast,
            #'is_dessert': self.is_dessert,
            #'is_dinner': self.is_dinner,
            'image_url': self.image_url,
            'meal_type': self.meal_type,
            'is_favorite': False,
            'comments': [c.get_data() for c in self.comments]
        }
        rating_count = Rating.query.filter_by(recipe=self.id).count()
        if rating_count == 0:
            data['rating'] = 0
        else:
            data['rating'] = sum([r.rating for r in Rating.query.all() if r.recipe==self.id]) / float(rating_count)
            data['rating_count'] = rating_count
        if user != None and user.is_authenticated:
            user_rating = self.ratings.filter_by(user=user.id).first()
            if user_rating != None:
                data['user_rating'] = user_rating.rating
            data['is_favorite'] = self in user.favorite_recipes
        return data

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True, unique=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
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
    
