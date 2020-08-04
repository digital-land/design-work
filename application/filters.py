from jinja2 import evalcontextfilter, Markup

import markdown
md = markdown.Markdown(extensions = ['meta'])

def strip(s, chars):
	return s.strip(chars)

@evalcontextfilter
def markdown_filter(eval_ctx, s):
	if eval_ctx.autoescape:
		result = Markup(md.convert(s))
	return result