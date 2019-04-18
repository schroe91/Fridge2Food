from flask import jsonify, request, Response, url_for, abort, g, session
from flask import current_app as app
from app import db, auth
from flask_login import current_user, login_user, logout_user
from flask_httpauth import HTTPBasicAuth
from app.models import User, Ingredient
from app.email import send_reset_email
from app.api import bp
from app.functions import login_required
import requests
from tempfile import SpooledTemporaryFile
from PIL import Image
from resizeimage import resizeimage
import time
import os
import json

# Guest user helper functions
def get_guest_ingredients():
    if session.get('ingredients') == None:
        session['ingredients'] = json.dumps([])
        return []
    else:
        ingredients = json.loads(session.get('ingredients'))
        return [Ingredient.query.get(i) for i in ingredients]

def set_guest_ingredients(ingredient_list):
    ingredient_ids = [i.id for i in ingredient_list]
    session['ingredients'] = json.dumps(ingredient_ids)

def guest_to_dict():
    ing_list = get_guest_ingredients()
    data = {
        'id': -1,
        'ingredients': [i.to_dict() for i in ing_list]
    }
    print(json.dumps(data))
    return data

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

@bp.route('/users/login', methods=['POST'])
def user_login():
    print(request.headers)
    #print(request.body)
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)
    user = User.query.filter_by(username=username).first()
    if user.check_password(password) is False:
        print("Password check failed")
        abort(400)
    login_user(user)
    #db.session.add(user)
    ingredients = get_guest_ingredients()
    for ing in ingredients:
        user.ingredients.append(ing)
    set_guest_ingredients([])
    db.session.commit()
    return jsonify(user.to_dict())

@bp.route('/users/logout', methods=['GET'])
@login_required
def user_logout():
    logout_user()
    return url_for('api.user_login')

@bp.route('/users/changeavatar', methods=['POST'])
@login_required
def image_change():
    url = request.json.get('image_url')
    
    #url = "https://via.placeholder.com/550"
    r = requests.get(url, stream=True)
    if r.status_code == 200:
        with SpooledTemporaryFile() as f:#open(path, 'wb') as f:
            for chunk in r:
                f.write(chunk)
            with Image.open(f) as img:
                cover = resizeimage.resize_cover(img, [200,200])
                filename = str.format("{}_{}.png",
                                      current_user.id,
                                      time.time())
                filepath = os.path.join(app.config['PROFILE_IMAGE_FOLDER'],
                                            filename)
                print(filepath)
                cover.save(filepath, "PNG")
                print(url_for('static', filename="images/"+filename))
                current_user.avatar_url = url_for('static', filename="images/"+filename)
                db.session.commit()
                return jsonify(current_user.to_dict())

@bp.route('/users/changename', methods=['POST'])
@login_required
def change_name():
    print(current_user)
    print(request.headers)
    newusername = request.json.get('username')
    password = request.json.get('password')
    if newusername is None or password is None:
        abort(400)
    if User.query.filter_by(username = newusername).first() is not None:
        abort(400)
    #user = User.query.get_or_404(id)
    
    if current_user.check_password(password) is False:
        abort(400)
    current_user.username = newusername
    db.session.commit()
    return jsonify(current_user.to_dict())

@bp.route('/users/newpassword', methods=['POST'])
@login_required
def change_password():
    newPass = request.json.get('newPassword')
    oldPass = request.json.get('oldPassword')
    if newPass is None or oldPass is None:
        abort(400)
    if current_user.check_password(oldPass) is False:
        abort(400)
    #current_user.password = newPass
    current_user.set_password(newPass)
    db.session.commit()
    return jsonify(current_user.to_dict())

@bp.route('/users/request_reset', methods=['POST'])
def request_reset():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        send_reset_email(user)
    return ''

@bp.route('/users/reset_password/<token>', methods=['POST'])
def reset_password(token):
    user = User.verify_auth_token(token)
    if not user:
        abort(400)
    password = request.json.get('password')
    user.set_password(password)
    db.session.commit()
    return jsonify(user.to_dict())

@bp.route('/users/current', methods=['GET'])
def get_current_user():
    if not current_user.is_authenticated:
        return jsonify(guest_to_dict())
    return jsonify(current_user.to_dict())

@bp.route('/users/current/ingredients', methods=['POST'])
def add_current_user_ingredients():
    user = current_user

    print(request.json)
    
    ing = None
    ingredient_id = request.json.get('id')
    if ingredient_id != None:
        ing = Ingredient.query.get_or_404(ingredient_id)

    ingredient_name = request.json.get('name').lower()
    if ingredient_name != None:
        ing = Ingredient.query.filter_by(name=ingredient_name).first()
    else:
        print("Ingredient name not found")
        
    if ing == None:
        print("Ingredient not found")
        abort(400)
    if user.is_authenticated:
        if ing not in user.ingredients:
            user.ingredients.append(ing)
            db.session.commit()
            print("Adding ingredient")        
        return jsonify(user.to_dict()), 201
    else:
        # User is a guest user
        ingredients = get_guest_ingredients()
        if ing not in ingredients:
            ingredients.append(ing)
            set_guest_ingredients(ingredients)
            print("Added ingredient to guest")
        return jsonify(guest_to_dict())


@bp.route('/users/<int:id>/ingredients', methods=['POST'])
@login_required
def add_user_ingredients(id):
    user = User.query.get_or_404(id)

    ing = None
    ingredient_id = request.json.get('id')
    if ingredient_id != None:
        ing = Ingredient.query.get_or_404(ingredient_id)

    ingredient_name = request.json.get('name').lower()
    if ingredient_name != None:
        ing = Ingredient.query.filter_by(name=ingredient_name).first()

    if ing == None:
        abort(400)
    if ing not in user.ingredients:
        user.ingredients.append(ing)
        db.session.commit()
        print("Adding ingredient")
        
    return jsonify(user.to_dict()), 201


@bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())


@bp.route('/users/current/ingredients/all', methods=['DELETE'])
def delete_all_current_user_ingredients():
    user = current_user
    if user.is_authenticated:
        for ing in user.ingredients:
            user.ingredients.remove(ing)
        db.session.commit()
    else:
        set_guest_ingredients([])
    return '', 204


@bp.route('/users/<int:id>/ingredients/all', methods=['DELETE'])
def delete_all_user_ingredients(id):
    user = None
    if id.lower() == "current":
        user = current_user
    else:
        user = User.query.get_or_404(id)
    for ing in user.ingredients:
        user.ingredients.remove(ing)
    db.session.commit() 
    return '', 204

@bp.route('/users/<id>/allergies', methods=['POST'])
def add_allergy(id):
    user = None
    if id.lower() == "current":
        user = current_user
    else:
        user = User.query.get_or_404(id)
    
    ing_id = request.json.get('ingredient')
    ing = Ingredient.query.get(ing_id)
    user.allergies.append(ing)
    db.session.commit()
    return ''

@bp.route('/users/current/ingredients/', methods=['DELETE'])
def delete_current_user_ingredient_by_name():
    user = current_user
    
    name = request.json.get("name").lower()
    print("Deleting: "+name)
    ing = Ingredient.query.filter_by(name=name).first()
    if user.is_authenticated:
        if ing not in user.ingredients:
            print("Ingredient not in user")
            return '', 404
        user.ingredients.remove(ing)
        db.session.commit()
    else:
         #Guest user
        ingredients = get_guest_ingredients()
        ingredients.remove(ing)
        set_guest_ingredients(ingredients)
    return '', 204

@bp.route('/users/<int:id>/ingredients/', methods=['DELETE'])
def delete_user_ingredient_by_name(id):
    user = User.query.get_or_404(id)
    name = request.json.get("name").lower()
    print("Deleting: "+name)
    ing = Ingredient.query.filter_by(name=name).first()
    if ing not in user.ingredients:
        print("Ingredient not in user")
        return '', 404
    user.ingredients.remove(ing)
    db.session.commit()
    return '', 204

@bp.route('/users/current/ingredients/<int:ing_id>', methods=['DELETE'])
def delete_current_user_ingredient(ing_id):
    user = current_user
    ing = Ingredient.query.get_or_404(ing_id)
    if user.is_authenticated:
        if ing not in user.ingredients:
            return '', 404
        user.ingredients.remove(ing)
        db.session.commit()
    else:
        # Guest user
        ingredients = get_guest_ingredients()
        ingredients.remove(ing)
        set_guest_ingredients(ingredients)
    return '', 204


@bp.route('/users/<int:id>/ingredients/<int:ing_id>', methods=['DELETE'])
def delete_user_ingredient(id, ing_id):
    user = User.query.get_or_404(id)
    ing = Ingredient.query.get_or_404(ing_id)
    if ing not in user.ingredients:
        return '', 404
    user.ingredients.remove(ing)
    db.session.commit()
    return '', 204

#Token
@bp.route('/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})

@bp.route('/users/allergies', methods=['GET'])
def get_allergies():
    pass
