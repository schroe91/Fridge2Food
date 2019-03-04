from flask import jsonify, request, Response, url_for, abort
from app import db
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

@bp.route('/users/<int:user_id>/ingredients/<int:ing_id>', methods=['DELETE'])
def delete_user_ingredient(user_id, ing_id):
    user = User.query.get_or_404(user_id)
    ing = Ingredient.query.get_or_404(ing_id)
    if ing not in user.ingredients:
        return '', 404
    user.ingredients.remove(ing)
    db.session.commit()
    return '', 204
