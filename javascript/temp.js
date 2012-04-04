function TempGraph()
{
	TempGraph.width = this.width = 640;
	this.height = 360;
	
	TempGraph.padding = this.padding = 54;
	
	this.primaryColor = "red";
	this.secondaryColor = "black";
	this.tertiaryColor = "blue";
	
	this.alphaHigh = 1.0;
	this.alphaLow = 0.2;
	
	this.data = new Array();
	this.largestY = -1;
	this.yDividers = 11;
	
	this.readData = function()
	{
		this.data = document.getElementById("tempData").innerHTML.split(",");
		
		for(var i = 0; i < this.data.length; i++)
		{
			if(parseFloat(this.data[i]) > this.largestY)
			{
				this.largestY = parseFloat(this.data[i]);
			}
		}
	};
	
	/*
	 * setupGraph()
	 *
	 * Initialize the graph space.
	 */
	this.setupGraph = function()
	{
		var graph = document.getElementById("tempGraph");
		var dataPoints = document.getElementById("tempDataPoints");
		var timeLine = document.getElementById("tempTimeLine");
		
		graph.width = this.width;
		graph.height = this.height;
		
		dataPoints.width = this.width;
		dataPoints.height = this.height;
		
		timeLine.width = 2;
		timeLine.height = this.height - (this.padding * 2);
		timeLine.style.top = this.padding + "px";
		
		timeLine.getContext("2d").globalAlpha = 0.5;
		timeLine.getContext("2d").fillStyle = "red";
		timeLine.getContext("2d").fillRect(0, 0, timeLine.width,
			timeLine.height);
	};
	
	/*
	 * clearGraph()
	 *
	 * Clear the graph space.
	 */
	this.clearGraph = function()
	{
		var graph = document.getElementById("tempGraph").getContext("2d");
		var dataPoints =
			document.getElementById("tempDataPoints").getContext("2d");
		var timeLine = document.getElementById("tempTimeLine");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
		
		timeLine.style.left = this.padding + "px";
	};
	
	/*
	 * drawBorder()
	 *
	 * Draw the graph's border.
	 */
	this.drawBorder = function()
	{
		var graph = document.getElementById("tempGraph").getContext("2d");
	
		graph.strokeStyle = this.secondaryColor;
		graph.fillStyle = this.secondaryColor;
		graph.lineWidth = 2;
	
		graph.moveTo(this.padding, this.padding);
		graph.lineTo(this.padding, (this.height-this.padding));
	
		graph.moveTo(this.padding, (this.height-this.padding));
		graph.lineTo((this.width-this.padding), (this.height-this.padding));
	
		graph.fill();
		graph.stroke();
	};
	
	/*
	 * updateTitle()
	 *
	 * Change the title to fit our graph.
	 */
	this.updateTitle = function()
	{
		var title = document.getElementById("tempCanvasTitle");
		var xAxis = document.getElementById("tempXAxisTitle");
		var yAxis = document.getElementById("tempYAxisTitle");

		title.innerHTML = "Temperature Inside the PI-Neph Measurement Chamber ";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Temperature Measured [deg C]";
	};
	
	/*
	 * drawAxes()
	 *
	 * Draw the axes for our graph.
	 */
	this.drawAxes = function()
	{
		var x, y, text;
		var times = document.getElementById("timeSelect");
		var graph = document.getElementById("tempGraph").getContext("2d");
		
		graph.fillStyle = this.secondaryColor;
		graph.strokeStyle = this.secondaryColor;
		graph.font = "bold 7pt sans-serif";
		graph.lineWidth = 1;
		
		for(var i = 0; i < 12; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 11 * i;
			x = x + this.padding;
			
			text = parseInt(64 + (1 * i)) + "k";
			
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(this.height - this.padding + 20));
			
			graph.globalAlpha = 0.7;
			text = secondsToCalendar(parseInt(64 + (1 * i)) * 1000);
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(this.height-  this.padding + 30));
		
			graph.globalAlpha = this.alphaLow;
			graph.moveTo(x, (this.height - this.padding + 5));
			graph.lineTo(x, this.padding);
		}
		
		for(i = 0; i < 5; i++)
		{
			y = this.height - (this.padding * 2);
			y = y / 3 * i;
			y = y + this.padding;
			
			text = 40 - (10 * i);
			
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text,
				(this.padding - graph.measureText(text).width - 10), (y + 4));
			
			graph.globalAlpha = this.alphaLow;
			graph.moveTo((this.padding - 5), y);
			graph.lineTo((this.width - this.padding), y);
		}
		
		graph.fill();
		graph.stroke();
	}
	
	/*
	 * plotPoints()
	 *
	 * Graph the data points from our readings.
	 */
	this.plotPoints = function()
	{
		var x, y, temp;
		var times = document.getElementById("timeSelect");
		var dataPoints =
			document.getElementById("tempDataPoints").getContext("2d");
		var timeLine = document.getElementById("tempTimeLine");
		
		dataPoints.strokeStyle = this.tertiaryColor;
		dataPoints.fillStyle = this.tertiaryColor;
		dataPoints.lineWidth = 1;
		
		for(var i = 0; i < this.data.length-1; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + this.padding;
		
			y = this.height - (this.padding * 2);
			
			temp = this.height - (this.padding * 2);
			temp = temp / 30 * (this.data[i] - 10);
			
			y = y - temp;
			y = y + this.padding;
		
			dataPoints.moveTo(x, y);
			dataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
			
			if(i == 0)
			{
				// add 15 because of the offset in the style sheet
				timeLine.style.left = x + 15 + "px";
			}
		}
		
		dataPoints.fill();
		dataPoints.stroke();
	};
	
	TempGraph.moveTimeLine = function()
	{
		var x;
		var timeLine = document.getElementById("tempTimeLine");
		var times = document.getElementById("timeSelect");
		
		x = this.width - (this.padding * 2);
		x = x / 11000 * (times.options[instanceTime].text - 64000);
		x = x + this.padding;
		
		// add 15 because of the offset in the style sheet
		timeLine.style.left = x + 15 + "px";
	};
}

function drawTemp()
{
	var tempGraph = new TempGraph();
	
	tempGraph.readData();
	
	tempGraph.setupGraph();
	
	tempGraph.clearGraph();
	
	tempGraph.drawBorder();
	
	tempGraph.updateTitle();
	
	tempGraph.drawAxes();
	
	tempGraph.plotPoints();
}
