from flask import Flask

app = Flask(__name__)

@app.route("/<string:symbol>/")
def get_symbol_data(symbol):
    return "<p>Hello, World!</p>" + symbol
