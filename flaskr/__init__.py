from flask import Flask
from flask import jsonify 
import sys
import os
sys.path.insert(0, os.getcwd()+"/flaskr/")
from project import last_step
from project import set_config 

app = Flask(__name__)

# Adjust these values with javascript front end

config = {
    "alpha_vantage": {
        "key": "1PE5QDO714ILKZ2Z", # Claim your free API key here: https://www.alphavantage.co/support/#api-key
        "symbol": "AAPL",
        "outputsize": "full",
        "key_adjusted_close": "5. adjusted close",
    },
    "data": {
        "window_size": 20,
        "train_split_size": 0.80,
    },
    "plots": {
        "xticks_interval": 90, # show a date every 90 days
        "color_actual": "#001f3f",
        "color_train": "#3D9970",
        "color_val": "#0074D9",
        "color_pred_train": "#3D9970",
        "color_pred_val": "#0074D9",
        "color_pred_test": "#FF4136",
    },
    "model": {
        "input_size": 1, # since we are only using 1 feature, close price
        "num_lstm_layers": 2,
        "lstm_size": 32,
        "dropout": 0.2,
    },
    "training": {
        "device": "cpu", # "cuda" or "cpu"
        "batch_size": 64,
        "num_epoch": 10,
        "learning_rate": 0.01,
        "scheduler_step_size": 40,
    }
}

@app.route("/<string:symbol>/")
def get_symbol_data(symbol):
    # data = download_data(config)
    config["alpha_vantage"]["symbol"] = symbol
    set_config(config)
    last_step()
    # return data

    # Need to convert the data from a pandas graph to a json format that a front end javascript can use to display some sexy graphs
    
    return "<p>Hello, World!</p>" + symbol
