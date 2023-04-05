#!/bin/bash
python3 -m virtualenv -p "$(which python3.10)" venv
source ./venv/bin/activate
pip install -r requirements.txt
python3.10 manage.py makemigrations
python3.10 manage.py migrate
cd reactapp
npm i
cd ..