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
    ing = Ingredient.query.filter(Ingredient.name == ingredient_name)
    if ing.count() == 0:
        ing = Ingredient(name=ingredient_name)
        db.session.add(ing)
        db.session.commit()
        return jsonify(ing.to_dict(include_recipes=True)), 201
    else:
        response = jsonify(ing[0].to_dict(include_recipes=True))
        response.status_code = 409
        response.headers['location'] = '/ingredients/{}'.format(ing[0].id)
        return response
