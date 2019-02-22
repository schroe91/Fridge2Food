from flask import jsonify, request
from app import db
from app.models import Recipe
from app.api import bp

def string_to_boolean(str):
    if str.lower() == "true":
        return True
    else:
        return False

@bp.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    searchResults = Recipe.query.get(id)
    return jsonify([r.to_dict() for r in searchResults])

@bp.route('/recipes', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query
    if request.args.get('name') != None:
        query = Recipe.query.filter(Recipe.name.like("%"+request.args.get('name')+"%"))
        recipes = recipes.union(query)
        
    
    return jsonify([r.to_dict() for r in recipes])
