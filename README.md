# Easy Chef

Easy Chef is a recipe-sharing website. Users can browse and search recipes, publish their own, like, favourite, rate and comment on other people's recipes, and turn any set of recipes into a combined shopping list.

## Stack

| Layer | Technology |
| --- | --- |
| Backend | Python 3.10, Django 4.1, Django REST Framework |
| Auth | JSON Web Tokens via `djangorestframework-simplejwt` |
| Database | SQLite (`db.sqlite3`, committed with seed data) |
| Frontend | React 18 (Create React App), React Router 6 |
| UI | React Bootstrap, MUI (star ratings), Font Awesome, Framer Motion page transitions, AOS scroll animations, react-slick carousels |

The Django app is a JSON API on `http://127.0.0.1:8000`. The React single-page app on `http://localhost:3000` calls it with `fetch`, sending the user's access token as a `Bearer` header. Every page has its own URL, so the browser's back and forward buttons work.

Uploaded recipe photos and avatars are stored in `media/` and served by Django.

## Features

### Accounts
- **Sign up** with email, first and last name, and password.
- **Log in and log out.** The session expires when the access token does (one day).
- **Edit your profile:** name, email, phone number, bio, password and avatar.
- **View your profile** with your details and recipes.

### Recipes
- **Create a recipe** with a name, description, photos, ingredients (quantity and unit), ordered step-by-step instructions, cuisine, diet tags (vegan, halal), prep and cook time, and servings. Ingredient names autocomplete from existing ingredients.
- **Edit or delete** recipes you own.
- **View a recipe:** photo gallery, ingredients, numbered steps, details and its average rating.

### Community
- **Like** and **favourite** recipes, and undo either.
- **Rate** a recipe from 0 to 5 stars and change your rating later.
- **Comment** on recipes.

### Discovery
- **Home page** with a carousel of featured, top-rated recipes.
- **Search** by recipe name, ingredient or creator.
- **Filter** results by diet, cuisine and cooking time.
- **Sort** by star rating or number of favourites. Results are paginated.

### My Recipes
- See the recipes you created, the ones you favourited, and the ones you've recently liked, rated or commented on.

### Shopping list
- Add recipes from a search box and set servings for each.
- See the combined ingredient totals across every recipe on the list, scaled to your servings.
- **Export** the totals as a `shopping_list.csv` file.

## Getting started

**Requirements:** Python 3.10 with `virtualenv`, and Node.js 18.

```bash
# One-time setup: creates venv/, installs Python and npm packages, applies migrations
bash startup.sh

# Start both servers
source venv/bin/activate
bash run.sh
```

Then open http://localhost:3000.

`run.sh` starts Django in the background and the React dev server in the foreground. To run them separately instead:

```bash
# Terminal 1: backend on :8000
source venv/bin/activate
python manage.py runserver

# Terminal 2: frontend on :3000
cd reactapp
npm start
```

If port 8000 is already in use by an old server, stop it with `pkill -f "manage.py runserver"`.

### Database

The repo includes `db.sqlite3` with sample users, recipes and images, so the site has content right after cloning.

If the file is missing, run `python manage.py migrate` to create an empty database with the full schema. To use the Django admin at http://127.0.0.1:8000/admin/, create an account with `python manage.py createsuperuser`.

## Project structure

```
easychef/      Django project: settings, root URLs, recipe search endpoints
accounts/      Custom user model, sign-up, login (JWT), profile, My Recipes API
recipes/       Recipes, ingredients, steps, images, comments, ratings,
               likes/favourites and shopping list models and API
media/         Uploaded recipe photos and avatars
reactapp/      React frontend
  src/pages/        One folder per route (Home, Login, CreateRecipe, ViewRecipe, ...)
  src/components/   Shared UI (NavBar, search, carousels, popups, ...)
startup.sh     One-time environment setup
run.sh         Starts the backend and frontend
```
