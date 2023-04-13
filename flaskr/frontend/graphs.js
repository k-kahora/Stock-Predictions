function test() {
values = {
    "stock": d3.select("#stock").property("value"),
    "num_epoch": d3.select("#num_epoch").property("value"),
    "learning_rate": d3.select("#learning_rate").property("value"),
    "ltsm_size": d3.select("#ltsm_size").property("value"),
    "batch_size": d3.select("#batch_size").property("value"),
    "dropout": d3.select("#dropout").property("value"),
    "num_lstm_layers": d3.select("#num_lstm_layers").property("value"),
    "scheduler_step_size": d3.select("#scheduler_step_size").property("value"),
}
    console.log(values)
}

d3.select("#epochs").on("input", function() {
	console.log("val")
})

values = {
    "stock": "TSLA",
    "num_epoch": 3,
    "learning_rate": 0.01,
    "ltsm_size": 32,
    "batch_size": 64,
    "dropout": 32,
    "num_lstm_layers": 2,
    "scheduler_step_size": 0,
}

function getUserInput() {

   return values = {
	"stock": d3.select("#stock").property("value"),
	"num_epoch": d3.select("#num_epoch").property("value"),
	"learning_rate": d3.select("#learning_rate").property("value"),
	"ltsm_size": d3.select("#ltsm_size").property("value"),
	"batch_size": d3.select("#batch_size").property("value"),
	"dropout": d3.select("#dropout").property("value"),
	"num_lstm_layers": d3.select("#num_lstm_layers").property("value"),
	"scheduler_step_size": d3.select("#scheduler_step_size").property("value"),
    }
    
}

function doThing() {

    values = getUserInput()
	//     console.log("hres")   
	// console.log(d3.max([4321,321,43214321]))
    var width = 1000
    var height = 400 

    // margin for the scales and the actual graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = width - margin.left - margin.right,
      height = height - margin.top - margin.bottom;

    d3.json("http://localhost:5000/predict/" + values["stock"]).then(data_unformated => {


	    // potential filter functions
	    var filterFunc = function(d) {
		return parseTime(d) > new Date('11/14/2020 00:00')
	    }
	    var filterFuncN = function(d) {
		return d > new Date('11/14/2020 00:00')
	    }

	    // split the data into predicted actual and the final price
	    ai_data = data_unformated["prediction_data"]
	    final_price = data_unformated["closing_price"]

	    // Log the graph data for debugging purposes
	    console.log(data_unformated["prediction_data"])
	    console.log(data_unformated["stock_data"])
	    var svg = d3.select("body")
		.append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    // This g holds the entire graph
	    .append("g")
		.attr("transform",
		      "translate(" + margin.left + "," + margin.top + ")").classed("chart", true)

	    var parseTime = d3.timeParse("%Y-%m-%d")
	    minimum_date_perdicted = d3.min(ai_data, d => parseTime(d.date))
	    data = data_unformated["stock_data"].reverse();
	    // Each time needs to be converted to a javascript time
	    var dates = [];
	    for (let obj of data) {
		if (parseTime(obj.date) > minimum_date_perdicted ){
		     dates.push(parseTime(obj.date));
		}
	    }
	    var x_domain = d3.extent(dates)

	    var x_scale = d3.scaleTime()
		.domain(x_domain)
		.range([ 0, width ]);


	    // filter the data down to the same as the predicted to get reasomalbl scales
		data = data.filter(d => parseTime(d.date) > minimum_date_perdicted)
	    ai_data = ai_data.filter(d => parseTime(d.date) > minimum_date_perdicted)
            var y_scale = d3.scaleLinear().domain([d3.min(ai_data, d => d.value), d3.max(data, d => d.close)]).range([height, 0])

	    var xAxis = d3.axisBottom(x_scale)    
	    var yAxis = d3.axisLeft(y_scale)    

	    // y_axis group
	    // y_axis group
	    var y_axis = svg
		.append("g")
                .attr("id", "right").call(yAxis)

	    // x_axis group
	    var x_axis = svg
		.append("g")
		.attr("transform", "translate(0," + (height) + ")").call(xAxis)

	    // Plot group
	    var wick_plots = svg
		.append("g")
	    var stock_plots = svg
		.append("g")
	    var ai_plots = svg
		.append("g")

	    // This is the predicted data after machine learning
	    ai_plots.append("path")
	      .datum(ai_data)
	      .attr("fill", "none")
	      .attr("stroke", "black")
	      .attr("stroke-width", 1.5)
	      .attr("d", d3.line()
		    .x(function(d) { return x_scale(parseTime(d.date)) })
		    .y(function(d) {/* console.log(y_scale(d.high));*/return y_scale(d.value) })
	      )

	  stock_plots.append("path")
	      .datum(data)
	      .attr("fill", "none")
	      .attr("stroke", "steelblue")
	      .attr("stroke-width", 1.5)
	      .attr("d", d3.line()
		    .x(function(d) { return x_scale(parseTime(d.date)) })
		    .y(function(d) {/* console.log(y_scale(d.high));*/return y_scale(d.close) })
	      )
	})
}
