from app.main import bp
from app import db
from flask_login import current_user, login_user, logout_user
from flask import render_template
from app.models import User
from app.forms import RegistrationForm, LoginForm

@bp.route('/')
@bp.route('/index')
def index():
    return "Hello world!"

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            #Tell the user it's invalid
            return redirect(url_for('login'))
        login_user(user)
        return redirect(url_for('index'))
    #else show the login page
    return render_template('login.html', title='Sign In', form=form)

@bp.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        #user is registered
        return redirect(url_for('login'))
    #else show them the create user stuff again
    return render_template('register.html', title='Sign Up', form=form)

