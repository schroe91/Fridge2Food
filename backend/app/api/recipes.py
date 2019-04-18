from flask import jsonify, request, abort
from app import db
from app.models import *
from app.api import bp
from flask_login import current_user
from app.functions import login_required

def string_to_boolean(str):
    if str.lower() == "true":
        return True
    else:
        return False

@bp.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
#    searchResults = Recipe.query.get(id)
    user = current_user
    if user.get_id() == None:
        user = None
    return jsonify(Recipe.query.get_or_404(id).to_dict(user))

@bp.route('/recipes/<int:id>/comments', methods=['POST'])
def add_comment(id):
    r = Recipe.query.get_or_404(id)
    comment_content = request.json.get('comment')
    c = Comment(creator=current_user.id, content=comment_content)
    r.comments.append(c)
    db.session.commit()
    return ''

@bp.route('/recipes/<int:id>/ratings', methods=['POST'])
@login_required
def add_rating(id):
    rating_num = request.json.get('rating')
    if rating_num is None:
        abort(400)
    if rating_num > 5:
        rating_num = 5
    if rating_num < 1:
        rating_num = 1
    
    recipe = Recipe.query.get_or_404(id)
    rating = Rating.query.filter_by(user=current_user.id, recipe=recipe.id).first()
    if rating == None:
        rating = Rating(user=current_user.id, recipe=recipe.id, rating=rating_num)
        db.session.add(rating)
    else:
        rating.rating = rating_num
    #recipe.ratings.append(rating)
    db.session.commit()
    return jsonify(recipe.to_dict(user=current_user))

@bp.route('/recipes/<int:id>/comments/<int:comment_id>', methods=['POST'])
def commentception(id, comment_id):
    #r = Recipe.query.filter_by(id=id).first()
    c = Comment.query.get({"id": comment_id})
    print(c.get_data())
    comment_content = request.json.get('comment')
    print(comment_content)
    com = Comment(creator=current_user.id, content=comment_content)
    print(com.get_data())
    c.com_comments.append(com)
    db.session.commit()
    
    #r.query.get(comments)
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
    if request.json.get('ingredients') != None:
        for i in request.json.get('ingredients'):
            recipe.ingredients.append(Ingredient.query.get(i))
    db.session.add(recipe)
    db.session.commit()
    return jsonify(recipe.to_dict())
                    

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
    if request.args.get('rating') != None:
        rating_arr = request.args.get('rating').split(',')
        
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
    return jsonify([r.to_dict(current_user) for r in recipes])
    


