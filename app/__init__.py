import os
import sqlalchemy
from flask import Flask
from yaml import load, Loader
from flask_msearch import Search

def init_connection():
    # detect env local or gcp
    if os.environ.get('GAE_ENV') != 'standard':
        try:
            variables = load(open("app.yaml"), Loader=Loader)
        except OSError as e:
            print("Make sure you have the app.yaml file setup")
            os.exit()

        env_variables = variables['env_variables']
        for var in env_variables:
            os.environ[var] = env_variables[var]

    pool = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username=os.environ.get('MYSQL_USER'),
            password=os.environ.get('MYSQL_PASSWORD'),
            database=os.environ.get('MYSQL_DB'),
            host=os.environ.get('MYSQL_HOST')
        )
    )
    return pool
    
app=Flask(__name__)
db=init_connection()
search = Search(app)
search.init_app(app)
search.create_index(update=True)
MSEARCH_INDEX_NAME =  os.path.join(app.root_path,'msearch')
MSEARCH_PRIMARY_KEY = 'id'
MSEARCH_ENABLE = True

from app import routes







