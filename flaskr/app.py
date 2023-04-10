from flask import Flask, request, jsonify
import stockpredict 

app = Flask(__name__)

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]



@app.route('/predict/<symbol>')
def get_stock(symbol):
    return jsonify(stockpredict.plot_stock(symbol))

@app.route('/incomes')
def get_incomes():
    return jsonify(incomes)


@app.route('/incomes', methods=['POST'])
def add_income():
    incomes.append(request.get_json())
    return '', 204
