from fridge2food import create_app
from app.models import *
from app import db

app = create_app()
app.app_context().push()

#u = User(username='asdfaww', email='test@test.com')
r = Recipe(name='salted pork', creator_id=1, is_vegan=False)

db.session.add(r)

db.session.add(Ingredient(name='salt'))
db.session.add(Ingredient(name='butter'))
db.session.add(Ingredient(name='pork'))
db.session.add(Ingredient(name='pinto beans'))

db.session.add(User(username='Anthony', email='test@example.com'))
db.session.add(Recipe(name='Better Pork', creator_id=2))

r = Recipe.query.get(2)
r.ingredients.append(Ingredient.query.get(1))
r.ingredients.append(Ingredient.query.get(2))
r.ingredients.append(Ingredient.query.get(3))
db.session.commit()
