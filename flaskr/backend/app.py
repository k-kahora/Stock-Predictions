from flask import Flask, request, jsonify
import stockpredict 
from flask_cors import CORS

app = Flask(__name__)

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]

@app.route('/predict/<symbol>')
def get_stock(symbol):
    return_obj = stockpredict.plot_stock(symbol)
    return jsonify(return_obj)

@app.route('/test')
def get_test():
    return jsonify("here")

@app.route('/incomes')
def get_incomes():
    return jsonify(incomes)

@app.route('/incomes', methods=['POST'])
def add_income():
    incomes.append(request.get_json())
    return '', 204
CORS(app)
