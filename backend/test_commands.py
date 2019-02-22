from fridge2food import create_app
from app.models import *
from app import db

app = create_app()
app.app_context().push()

#u = User(username='asdfaww', email='test@test.com')
#r = Recipe(name='salted shit', creator_id=1, is_vegan=False)

#db.session.add(r)

#db.session.add(Ingredient(name='shit'))
"""
db.session.add(Ingredient(name='salt'))
db.session.add(Ingredient(name='shit'))
db.session.add(Ingredient(name='butter'))
db.session.add(Ingredient(name='black beans'))
db.session.add(Ingredient(name='pinto beans'))
"""
#db.session.add(User(username='Anthony', email='test@example.com'))
db.session.add(Recipe(name='Better Shit', creator_id=1))

r = Recipe.query.get(2)
r.ingredients.append(Ingredient.query.get(1))
r.ingredients.append(Ingredient.query.get(2))
db.session.commit()
