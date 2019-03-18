from flask import jsonify, request, Response, url_for, abort, g
from app import db, auth
from flask_login import current_user, login_user, logout_user
from flask_httpauth import HTTPBasicAuth
from app.models import User, Ingredient
from app.api import bp

@bp.route('/users', methods=['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    if username is None or password is None or email is None:
        abort(400)
    if User.query.filter_by(username = username).first() is not None or User.query.filter_by(email = email).first() is not None:
        abort(400)
    user = User(username = username, email = email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'username': user.username}), 201, {'Location': url_for('api.get_user', id = user.id, _external=True)}

@bp.route('/users/login', methods=['POST'])
def user_login():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)
    user = User.query.filter_by(username=username).first()
    if user.check_password(password) is False:
        abort(400)
    login_user(user)
    #db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict())

@bp.route('/users/logout', methods=['GET'])
def user_logout():
    logout_user()
    return url_for('main.index')

@bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())

@bp.route('/users/<int:id>/ingredients', methods=['POST'])
def add_user_ingredients(id):
    user = User.query.get_or_404(id)
    ingredient_id = request.json['id']
    ing = Ingredient.query.get_or_404(ingredient_id)
    user.ingredients.append(ing)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@bp.route('/users/<int:user_id>/ingredients', methods=['DELETEALL'])
def delete_all_user_ingredients(user_id):
    user = User.query.get_or_404(user_id)
    for ing in user.ingredients:
        user.ingredients.remove(ing)
    db.session.commit()
    return '', 204

@bp.route('/users/<int:user_id>/ingredients/<int:ing_id>', methods=['DELETE'])
def delete_user_ingredient(user_id, ing_id):
    user = User.query.get_or_404(user_id)
    ing = Ingredient.query.get_or_404(ing_id)
    if ing not in user.ingredients:
        return '', 404
    user.ingredients.remove(ing)
    db.session.commit()
    return '', 204

#Token
@bp.route('/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})
