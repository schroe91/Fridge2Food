from flask import jsonify, request
from app import db
from app.models import *
from app.api import bp
from flask_login import current_user

def string_to_boolean(str):
    if str.lower() == "true":
        return True
    else:
        return False

@bp.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
#    searchResults = Recipe.query.get(id)
    return jsonify(Recipe.query.get_or_404(id).to_dict())

@bp.route('/recipes/<int:id>/comments', methods=['POST'])
def add_comment(id):
    r = Recipe.query.get_or_404(id)
    comment_content = request.json.get('comment')
    c = Comment(creator=current_user.id, content=comment_content)
    r.comments.append(c)
    db.session.commit()
    return ''

@bp.route('/recipes', methods=['POST'])
def add_recipe():
    recipe = Recipe(name = request.json.get('name'),
                    creator_id = current_user.id,
                    prep_steps = request.json.get('prep_steps'),
                    prep_time = request.json.get('prep_time'),
                    calories = request.json.get('calories'),
                    carbs = request.json.get('carbs'),
                    fat = request.json.get('fat'),
                    protein = request.json.get('protein'),
                    is_vegan = request.json.get('is_vegan'),
                    is_vegetarian = request.json.get('is_vegetarian'),
                    is_glutenfree = request.json.get('is_glutenfree'))
    for i in request.json.get('ingredients'):
        recipe.ingredients.append(Ingredient.query.get(i))
    db.session.add(r)
    db.session.commit()
    return r.to_dict()
                    

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
        cal_arr = request.args.get('calories').split(',')
        calorie = [Recipe.query.get(calories) for cals in cal_arr]
        for recipe in recipes:
            if calorie < recipe.calories:
                recipes = recipes.intersect(recipe_query)     
    
    if request.args.get('prep_time') != None:
        prep_arr = request.args.get('prep_time').split(',')
        time = [Recipe.query.get(prep_time) for prep in prep_arr]
        for recipe in recipes:
            if time < recipe.prep_time:
                recipes = recipes.intersect(recipe_query) 
    
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
    


