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
    learning_rate = request.args.get("learning_rate", type=float, default=0.01)
    ltsm_size = request.args.get("ltsm_size", type=int, default=32)
    batch_size = request.args.get("batch_size", type=int, default=64)
    dropout = request.args.get("dropout", type=int, default=0.02)
    num_lstm_layers = request.args.get("num_lstm_layers", type=int, default=2)
    scheduler_step_size = request.args.get("scheduler_step_size", type=int, default=40)

    new_vars = {
        "stock": symbol,
        "num_epoch": num_epoch,
        "learning_rate": learning_rate,
        "ltsm_size": ltsm_size,
        "batch_size": batch_size,
        "dropout": dropout,
        "num_lstm_layers": num_lstm_layers,
        "scheduler_step_size": scheduler_step_size,
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
