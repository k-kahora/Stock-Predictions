import pandas as pd
stock_data = pd.read_csv("./NFLX.csv", index_col="Date")

import matplotlib.dates as mdates
import matplotlib.dates as plt
import datetime as dt

plt.figure(figsize=(15,10))
plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
plt.gca().xaxis.set_major_locator(mdates.DayLocator(interval=60))
x_dates = [dt.datetime.strptime(d, '%Y-%m-%m').date() for d in stock_data.index.values]



