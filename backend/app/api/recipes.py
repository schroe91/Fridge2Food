from flask import jsonify, request, abort
from app import db
from app.models import *
from app.api import bp
from flask_login import current_user
from app.functions import login_required
from app.api.users import get_guest_ingredients
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

#@bp.route('/api/recipe', methods=['POST'])
def get_recipe_image(recipe_id, image_url):
    url = request.json.get('image_url')    
    r = requests.get(url, stream=True)
    if r.status_code == 200:
        with SpooledTemporaryFile() as f:
            for chunk in r:
                f.write(chunk)
            with Image.open(f) as img:
                cover = resizeimage.resize_cover(img, [200,200])
                filename = str.format("recipe_{}.png",
                                      time.time())
                filepath = os.path.join(app.config['PROFILE_IMAGE_FOLDER'],
                                        filename)
                print(filepath)
                cover.save(filepath, "PNG")
                print(url_for('static', filename="images/"+filename))
                return url_for('static', filename="images/"+filename)
                #db.session.commit()
                #return jsonify(current_user.to_dict())

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
    print(request.json)
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
    if request.json.get('image_url') != None:
        image_url = get_recipe_image(request.json.get('image_url')),
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

    ingredients = None
    ingredient_count = 0
    if current_user.is_authenticated:
        ingredients = current_user.ingredients
        ingredient_count = ingredients.count()
    else:
        ingredients = get_guest_ingredients()
        ingredient_count = len(ingredients)

    if request.args.get('excludeunmakeable') == "true":
        #ing_arr = request.args.get('ingredients').split(",")
        #ingredients = [Ingredient.query.get(id) for id in ing_arr]
        new_recipes = []
        for recipe in recipes:
            containsAllIngredients = True
            for ing in recipe.ingredients:
                if ing not in ingredients:
                    containsAllIngredients = False
            if containsAllIngredients:
                new_recipes.append(recipe)
                    
        for recipe in recipes:
            missingIngredients = 0
            for ing in recipe.ingredients:
                if ing not in ingredients:
                    missingIngredients += 1
            if missingIngredients == 1:
                new_recipes.append(recipe)
        recipes = new_recipes

    recipe_dict_list = [r.to_dict(current_user) for r in recipes]
    for recipe in recipe_dict_list:
        missingIngredients = 0
        for ing in Recipe.query.get(recipe['id']).ingredients:
            print(ingredients)
            if ing not in ingredients:
                missingIngredients += 1
        recipe['missing_ingredient_count'] = missingIngredients
    
    return jsonify(recipe_dict_list)
    


