function AltGraph()
{
	AltGraph.width = this.width = 640;
	this.height = 360;
	
	AltGraph.padding = this.padding = 64;
	
	this.primaryColor = "red";
	this.secondaryColor = "black";
	this.tertiaryColor = "blue";
	
	this.alphaHigh = 1.0;
	this.alphaLow = 0.2;
	
	this.data = new Array();
	this.largestY = -1;
	this.smallestY = 1;
	this.yDividers = 11;
	
	this.readData = function()
	{
		this.data = document.getElementById("altData").innerHTML.split(",");
		
		this.smallestY = this.data[0];
		
		for(var i = 0; i < this.data.length; i++)
		{
			if(parseFloat(this.data[i]) > this.largestY)
			{
				this.largestY = parseFloat(this.data[i]);
			}
			
			if(parseFloat(this.data[i]) < this.smallestY)
			{
				this.smallestY = parseFloat(this.data[i]);
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
		var graph = document.getElementById("altGraph");
		var dataPoints = document.getElementById("altDataPoints");
		var timeLine = document.getElementById("altTimeLine");
		
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
		var graph = document.getElementById("altGraph").getContext("2d");
		var dataPoints =
			document.getElementById("altDataPoints").getContext("2d");
		var timeLine = document.getElementById("altTimeLine");
	
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
		var graph = document.getElementById("altGraph").getContext("2d");
	
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
		var title = document.getElementById("altCanvasTitle");
		var xAxis = document.getElementById("altXAxisTitle");
		var yAxis = document.getElementById("altYAxisTitle");

		title.innerHTML = "GPS Altitude";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Altitude [feet]";
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
		var graph = document.getElementById("altGraph").getContext("2d");
		
		graph.fillStyle = this.secondaryColor;
		graph.strokeStyle = this.secondaryColor;
		graph.font = "bold 11pt sans-serif";
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
			
			graph.globalAlpha = 0.6;
			text = secondsToCalendarHHMM(parseInt(64 + (1 * i)) * 1000);
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(this.height-  this.padding + 35));
		
			graph.globalAlpha = this.alphaLow;
			graph.moveTo(x, (this.height - this.padding + 5));
			graph.lineTo(x, this.padding);
		}
		
		this.largestY = 16;
		
		for(i = 0; i < 8; i++)
		{
			y = this.height - (this.padding * 2);
			y = y / 8 * i;
			y = y + this.padding;
			
			text = this.largestY - (i * 2) + "k";
			
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text,
				(this.padding - graph.measureText(text).width - 10), (y + 4));
			
			graph.globalAlpha = this.alphaLow;
			graph.moveTo((this.padding - 5), y);
			graph.lineTo((this.width - this.padding), y);
		}
		
		y = this.height - this.padding;
		text = "0";
		
		graph.globalAlpha = this.alphaHigh;
		graph.fillText(text,
			(this.padding - graph.measureText(text).width - 10), y);
		
		graph.globalAlpha = this.alphaLow;
		graph.moveTo((this.padding - 5), y);
		graph.lineTo((this.width - this.padding), y);
		
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
			document.getElementById("altDataPoints").getContext("2d");
		var timeLine = document.getElementById("altTimeLine");
		
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
			temp = temp / 16 * (this.data[i] / 1000);
			
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
	
	AltGraph.moveTimeLine = function()
	{
		var x;
		var timeLine = document.getElementById("altTimeLine");
		var times = document.getElementById("timeSelect");
		
		x = this.width - (this.padding * 2);
		x = x / 11000 * (times.options[time].text - 64000);
		x = x + this.padding;
		
		// add 15 because of the offset in the style sheet
		timeLine.style.left = x + 15 + "px";
	};
}

function drawAlt()
{
	var altGraph = new AltGraph();
	
	altGraph.readData();
	
	altGraph.setupGraph();
	
	altGraph.clearGraph();
	
	altGraph.drawBorder();
	
	altGraph.updateTitle();
	
	altGraph.drawAxes();
	
	altGraph.plotPoints();
}
