from flask import jsonify, request, Response
from app import db
from app.models import User, Ingredient
from app.api import bp

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
