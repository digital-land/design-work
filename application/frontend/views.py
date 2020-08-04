import os
import json

from flask import (
    Blueprint,
    render_template,
    current_app
)

frontend = Blueprint('frontend', __name__, template_folder='templates')

@frontend.route('/')
@frontend.route('/index')
def index():
	return render_template('index.html')

@frontend.route('/journey/<journey>')
def journeys_viewer(journey):
    datafile = "application/data/" + journey + ".json"
    if os.path.isfile( datafile ):
      with open( datafile ) as data_file:
            journeys = json.load(data_file)
      return render_template('journey-viewer.html', journeys=journeys)
    else:
      return render_template("404.html"), 404
