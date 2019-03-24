from fridge2food import create_app
from app.models import *
from app import db

app = create_app()
app.app_context().push()

#u = User(username='asdfaww', email='test@test.com')
#r = Recipe(name='salted pork', creator_id=1, is_vegan=False)
i1 = Ingredient(name='canned tomatoes0')
#i2 = Ingredient(name='onion')
#i3 = Ingredient(name='ground beef')
#i4 = Ingredient(name='chili powder')
#i5 = Ingredient(name='kidney beans')

#db.session.add(i1)
#db.session.add(i2)
#db.session.add(i3)
#db.session.add(i4)
#db.session.add(i5)

r = Recipe(name='Better Chili', creator_id=1, prep_steps="""
    1. In a small pot or Dutch oven over medium heat, combine tomato sauce, tomatoes, onion and Italian seasoning.
    2. In the skillet over medium heat, cook the beef until brown. Drain and stir into the pot.
    3. Stir the chili powder into the pot; taste and adjust seasonings. Stir in the kidney beans and simmer until flavors are well blended. Serve.
""", prep_time=2, calories=546, carbs=40, protein=20, fat=30)

r.ingredients.append(i1)
#r.ingredients.append(i2)
#r.ingredients.append(i3)
#r.ingredients.append(i4)
#r.ingredients.append(i5)

db.session.add(r)
db.session.commit()
