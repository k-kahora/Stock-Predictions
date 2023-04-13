from flask import Flask, request, jsonify
import stockpredict 
from flask_cors import CORS

app = Flask(__name__)

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]

@app.route('/predict/<symbol>')
def get_stock(symbol):
    num_epoch = request.args.get("num_epoch", type=int, default=100)

    new_vars = {
        "stock": symbol,
        "num_epoch": num_epoch,
        "learning_rate": 0.01,
        "ltsm_size": 32,
        "batch_size": 64,
        "dropout": 32,
        "num_lstm_layers": 2,
        "scheduler_step_size": 0,
    }

    return_obj = stockpredict.plot_stock(new_vars)
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
