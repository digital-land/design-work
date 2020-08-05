# -*- coding: utf-8 -*-
from flask import Flask, render_template
from flask.cli import load_dotenv


load_dotenv()


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 10

    register_errorhandlers(app)
    register_blueprints(app)
    register_extensions(app)
    register_filters(app)
    register_commands(app)

    return app


def register_errorhandlers(app):
    def render_error(error):
        # If a HTTPException, pull the `code` attribute; default to 500
        error_code = getattr(error, 'code', 500)
        return render_template("error/{0}.html".format(error_code)), error_code
    for errcode in [400, 401, 404, 500]:
        app.errorhandler(errcode)(render_error)
    return None


def register_blueprints(app):
    from application.frontend.views import frontend
    app.register_blueprint(frontend)


def register_commands(app):
    pass


def register_filters(app):
    from application.filters import strip
    app.add_template_filter(strip)
    from application.filters import markdown_filter
    app.add_template_filter(markdown_filter, name="markdown")
    from application.filters import markdown_file
    app.add_template_filter(markdown_file, name="md_file")


def register_extensions(app):
    pass
