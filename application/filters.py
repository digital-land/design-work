import os
from jinja2 import evalcontextfilter, Markup

from flask import current_app as app

import markdown
md = markdown.Markdown(extensions = ['meta'])

def strip(s, chars):
	return s.strip(chars)

@evalcontextfilter
def markdown_filter(eval_ctx, s):
	if eval_ctx.autoescape:
		result = Markup(md.convert(s))
	return result


@evalcontextfilter
def markdown_file(eval_ctx, path):
	full_path = os.path.join(app.root_path,path)
	result = "no file"
	if eval_ctx.autoescape:
		if os.path.exists(full_path):
			f = open(full_path, "r")
			result = Markup(md.convert(f.read()))
		else:
			print("no file", path)
	return result