from functools import wraps
from flask import g, request, redirect, url_for, Response
from flask_login import current_user

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return Response("ERROR 401: User is not logged in", 401)
        return f(*args, **kwargs)
    return decorated_function
