from flask import jsonify, request, Response, url_for, abort, g
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
        abort(400)
    login_user(user)
    #db.session.add(user)
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
@login_required
def get_current_user():
    return jsonify(current_user.to_dict())

@bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())

@bp.route('/users/<int:id>/ingredients', methods=['POST'])
def add_user_ingredients(id):
    user = User.query.get_or_404(id)
    ingredient_id = request.get_json('id')
    print(ingredient_id)
    ing = Ingredient.query.get_or_404(ingredient_id)
    user.ingredients.append(ing)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@bp.route('/users/<int:user_id>/ingredients', methods=['DELETEALL'])
def delete_all_user_ingredients(user_id):
    user = User.query.get_or_404(user_id)
    for ing in user.ingredients:
        user.ingredients.remove(ing)
    db.session.commit()
    return '', 204

@bp.route('/users/<int:user_id>/ingredients/<int:ing_id>', methods=['DELETE'])
def delete_user_ingredient(user_id, ing_id):
    user = User.query.get_or_404(user_id)
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

<<<<<<< HEAD
#@bp.route('/users/allergies', methods=['GET'])
#def get_allergies():
=======
@bp.route('/users/allergies', methods=['GET'])
def get_allergies():
    pass
>>>>>>> 871d2c986879599e5f4782bb4c4860283e7dbc33
