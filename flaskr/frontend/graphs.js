function doThing() {
	//     console.log("hres")   
	// console.log(d3.max([4321,321,43214321]))
	var width = 1000
	var height = 400 

      var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = width - margin.left - margin.right,
      height = height - margin.top - margin.bottom;

	d3.json("http://localhost:5000/predict/AAPL").then(data => {

	    var svg = d3.select("body")
		.append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")").classed("chart", true)

	    // var test_cirle = svg.append("circle")
	    // 	.attr("cx", 20)
	    // 	.attr("cy", 20)
	    // 	.attr("r", 20)
	    // 	.attr("fill", "red")
	    
	    console.log(data) 

	    var parseTime = d3.timeParse("%Y-%m-%d")
	    var dates = [];
	    for (let obj of data) {
		dates.push(parseTime(obj.date));
	    }
	    var x_domain = d3.extent(dates)

	    var x_scale = d3.scaleTime()
		.domain(x_domain)
		.range([ 0, width ]);

            var y_scale = d3.scaleLinear().domain([d3.min(data, d => d.close), d3.max(data, d => d.close)]).range([height, 0])

	    console.log(d3.max(data, d => d.close))

	    var xAxis = d3.axisBottom(x_scale)    
	    var yAxis = d3.axisLeft(y_scale)    

	    var y_axis = svg
		.append("g")
                .attr("id", "right").call(yAxis)

	    var x_axis = svg
		.append("g")
		.attr("transform", "translate(0," + (height) + ")").call(xAxis)

	    // candle_wic
	    // d3.selectAll("rect")
	    // 	.data(data)
	    //     .enter().append("rect")
	    

	    console.log(dates)

	    console.log(d3.max(data, d => d.high))
	    
svg.append("path")
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