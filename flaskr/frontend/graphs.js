function doThing() {
	//     console.log("hres")   
	// console.log(d3.max([4321,321,43214321]))
	var width = 1000
	var height = 400 

      var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = width - margin.left - margin.right,
      height = height - margin.top - margin.bottom;

      d3.json("http://localhost:5000/predict/MSFT").then(data_unformated => {

	    data = data_unformated["stock_data"].reverse()
	    ai_data = data_unformated["prediction_data"]
	    final_price = data_unformated["closing_price"]

	    console.log(data_unformated["prediction_data"])
	    var svg = d3.select("body")
		.append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")").classed("chart", true)
	    console.log(data) 

	    var filterFunc = function(d) {
		return parseTime(d) > new Date('11/14/2020 00:00')
	    }
	    var filterFuncN = function(d) {
		return d > new Date('11/14/2020 00:00')
	    }

	    // Each time needs to be converted to a javascript
	    var parseTime = d3.timeParse("%Y-%m-%d")
	    var dates = [];
	    for (let obj of data) {
		dates.push(parseTime(obj.date));
	    }
	    var x_domain = d3.extent(dates)
	    console.log(x_domain)
	  
	    minimum_date_perdicted = d3.min(ai_data, d => parseTime(d.date))
	    console.log("Minimum Here")
	    console.log(minimum_date_perdicted)
	    console.log(x_domain[1])

	    var x_scale = d3.scaleTime()
		.domain([minimum_date_perdicted, x_domain[1]])
		.range([ 0, width ]);

	  console.log()

            var y_scale = d3.scaleLinear().domain([d3.min(data, d => d.close), d3.max(data, d => d.close)]).range([height, 0])

	    console.log("max")
	    console.log(d3.max(data, d => d.close))

	    var xAxis = d3.axisBottom(x_scale)    
	    var yAxis = d3.axisLeft(y_scale)    

	    var y_axis = svg
		.append("g")
                .attr("id", "right").call(yAxis)

	    var x_axis = svg
		.append("g")
		.attr("transform", "translate(0," + (height) + ")").call(xAxis)

	    var box_plots = svg
		.append("g")

svg.append("path")
		.datum(ai_data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
            .x(function(d) { return x_scale(parseTime(d.date)) })
            .y(function(d) {/* console.log(y_scale(d.high));*/return y_scale(d.value) })
        )

svg.append("path")
	      .datum(data.filter(filterFunc))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
            .x(function(d) { return x_scale(parseTime(d.date)) })
            .y(function(d) {/* console.log(y_scale(d.high));*/return y_scale(d.close) })
        )
	})
}
