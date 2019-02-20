from flask import jsonify, request, Response
from app import db
from app.models import Ingredient
from app.api import bp

@bp.route('/ingredients/<int:id>', methods=['GET'])
def get_ingredient(id):
    return jsonify(Ingredient.query.get_or_404(id).to_dict(include_recipes=True))

@bp.route('/ingredients', methods=['GET'])
def get_all_ingredients():
    name = request.args.get('name')
    if name == None:
        searchResult = Ingredient.query.all()
    else:
        searchResult = Ingredient.query.filter(Ingredient.name.like("%"+name+"%"))
    return jsonify([i.to_dict(include_recipes=True) for i in searchResult])

@bp.route('/ingredients', methods=['POST'])
def add_ingredient():
    ingredient_name = request.json['name']
    ing = Ingredient(name=ingredient_name)
    db.session.add(ing)
    db.session.commit()
    
    return jsonify(ing.to_dict(include_recipes=True)), 201
    
