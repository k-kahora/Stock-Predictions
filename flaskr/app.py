
from flask import Flask
from markupsafe import escape
# add this so anyone on the network can see the sight
# --host=0.0.0.0
# flask run --debug

app = Flask(__name__)

# @app.route("/<name>")
# def hello(name):
#     return f"Hello, {escape(name)}!"
from flask import url_for

from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
