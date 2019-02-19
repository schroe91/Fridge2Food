from flask import jsonify, request
from app import db
from app.models import Recipe
from app.api import bp

@bp.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    searchResults = Recipe.query.all()
    return jsonify([r.to_dict() for r in searchResults])
