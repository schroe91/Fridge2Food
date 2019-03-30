from flask import jsonify, request
from app import db
from app.models import Recipe, Ingredient
from app.api import bp

def string_to_boolean(str):
    if str.lower() == "true":
        return True
    else:
        return False

@bp.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
#    searchResults = Recipe.query.get(id)
    return jsonify(Recipe.query.get_or_404(id).to_dict())

@bp.route('/recipes', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query
    if request.args.get('name') != None:
        recipe_query = Recipe.query.filter(Recipe.name.like("%"+request.args.get('name')+"%"))
        recipes = recipes.intersect(recipe_query)

    if request.args.get('type') != None:
        type_arr = request.args.get('type').split(',')
        if 'vegan' in type_arr:
            recipe_query = Recipe.query.filter(Recipe.is_vegan==True)
            recipes = recipes.intersect(recipe_query)
        if 'vegetarian' in type_arr:
            recipe_query = Recipe.query.filter(Recipe.is_vegetarian==True)
            recipes = recipes.intersect(recipe_query)
        if 'glutenfree' in type_arr:
            recipe_query = Recipe.query.filter(Recipe.is_glutenfree==True)
            recipes = recipes.intersect(recipe_query)

    if request.args.get('calories') != None:
        calorie_query = Recipe.query.filter(Recipe.calories)
        
             
    
    
    if request.args.get('ingredients') != None:
        ing_arr = request.args.get('ingredients').split(",")
        ingredients = [Ingredient.query.get(id) for id in ing_arr]
        new_recipes = []
        for recipe in recipes:
            containsAllIngredients = True
            for ing in recipe.ingredients:
                if ing not in ingredients:
                    containsAllIngredients = False
            if containsAllIngredients:
                new_recipes.append(recipe)
        recipes = new_recipes
        print(request.args.get('ingredients')) 
    return jsonify([r.to_dict() for r in recipes])
    


