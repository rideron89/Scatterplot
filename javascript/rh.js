function RHGraph()
{
	RHGraph.width = this.width = 640;
	this.height = 360;
	
	RHGraph.padding = this.padding = 54;
	
	this.primaryColor = "red";
	this.secondaryColor = "black";
	this.tertiaryColor = "green";
	this.quaternaryColor = "yellow";
	this.quinaryColor = "purple";
	
	this.alphaHigh = 1.0;
	this.alphaLow = 0.2;
	
	this.rh1Data = new Array();
	this.rh2Data = new Array();
	this.rh3Data = new Array();
	this.largestY = -1;
	this.yDividers = 11;
	
	this.readData = function()
	{
		this.rh1Data = document.getElementById("rh1Data").innerHTML.split(",");
		this.rh2Data = document.getElementById("rh2Data").innerHTML.split(",");
		this.rh3Data = document.getElementById("rh3Data").innerHTML.split(",");
	};
	
	/*
	 * setupGraph()
	 *
	 * Initialize the graph space.
	 */
	this.setupGraph = function()
	{
		var graph = document.getElementById("rhGraph");
		var rh1DataPoints = document.getElementById("rh1DataPoints");
		var rh2DataPoints = document.getElementById("rh2DataPoints");
		var rh3DataPoints = document.getElementById("rh3DataPoints");
		var timeLine = document.getElementById("rhTimeLine");
		var legend = document.getElementById("rhLegend");
		
		graph.width = this.width;
		graph.height = this.height;
		
		rh1DataPoints.width = this.width;
		rh1DataPoints.height = this.height;
		
		rh2DataPoints.width = this.width;
		rh2DataPoints.height = this.height;
		
		rh3DataPoints.width = this.width;
		rh3DataPoints.height = this.height;
		
		timeLine.width = 2;
		timeLine.height = this.height - (this.padding * 2);
		timeLine.style.top = this.padding + "px";
		
		timeLine.getContext("2d").globalAlpha = 0.5;
		
		timeLine.getContext("2d").fillRect(0, 0, timeLine.width,
			timeLine.height);
		
		legend.width = 150;
		legend.height = 52;
	};
	
	/*
	 * clearGraph()
	 *
	 * Clear the graph space.
	 */
	this.clearGraph = function()
	{
		var graph = document.getElementById("rhGraph").getContext("2d");
		var rh1DataPoints =
			document.getElementById("rh1DataPoints").getContext("2d");
		var rh2DataPoints =
			document.getElementById("rh2DataPoints").getContext("2d");
		var rh3DataPoints =
			document.getElementById("rh3DataPoints").getContext("2d");
		var timeLine = document.getElementById("rhTimeLine");
		var legend = document.getElementById("rhLegend").getContext("2d");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		
		rh1DataPoints.clearRect(0, 0, rh1DataPoints.width,
			rh1DataPoints.height);
		rh2DataPoints.clearRect(0, 0, rh2DataPoints.width,
			rh2DataPoints.height);
		rh3DataPoints.clearRect(0, 0, rh3DataPoints.width,
			rh3DataPoints.height);
		
		timeLine.style.left = this.padding + "px";
		
		legend.clearRect(0, 0, legend.width, legend.height);
	};
	
	/*
	 * drawBorder()
	 *
	 * Draw the graph's border.
	 */
	this.drawBorder = function()
	{
		var graph = document.getElementById("rhGraph").getContext("2d");
	
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
	 * drawLegend()
	 * 
	 * Draw the graph's legend.
	 */
	this.drawLegend = function()
	{
		var legend = document.getElementById("rhLegend");
		var context = legend.getContext("2d");
		
		context.globalAlpha = 0.7;
		context.fillStyle = "white";
		
		context.fillRect(0, 0, legend.width, legend.height);
		
		context.globalAlpha = this.alphaHigh;
		
		context.beginPath();
		context.strokeStyle = this.tertiaryColor;
		context.fillStyle = this.tertiaryColor;
		context.moveTo(10, 12);
		context.arc(10, 12, 2, 0, (2*Math.PI), false);
		
		context.fill();
		context.stroke();
		
		context.beginPath();
		context.strokeStyle = this.quaternaryColor;
		context.fillStyle = this.quaternaryColor;
		context.moveTo(10, 27);
		context.arc(10, 27, 2, 0, (2*Math.PI), false);
		
		context.fill();
		context.stroke();
		
		context.beginPath();
		context.strokeStyle = this.quinaryColor;
		context.fillStyle = this.quinaryColor;
		context.moveTo(10, 42);
		context.arc(10, 42, 2, 0, (2*Math.PI), false);
		
		context.fill();
		context.stroke();
		
		context.fillStyle = "black";
		
		context.fillText("RH1, before PI-Neph inlet", 20, 15);
		context.fillText("RH2, inside PI-Neph inlet", 20, 30);
		context.fillText("RH3, after PI-Neph inlet", 20, 45);
		
		context.fill();
		context.stroke();
	}
	
	/*
	 * updateTitle()
	 *
	 * Change the title to fit our graph.
	 */
	this.updateTitle = function()
	{
		var title = document.getElementById("rhCanvasTitle");
		var xAxis = document.getElementById("rhXAxisTitle");
		var yAxis = document.getElementById("rhYAxisTitle");

		title.innerHTML = "Relative Humidity";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Relative Humidity [%]";
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
		var graph = document.getElementById("rhGraph").getContext("2d");
		
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
		
		for(i = 0; i < 6; i++)
		{
			y = this.height - (this.padding * 2);
			y = y / 5 * i;
			y = y + this.padding;
			
			text = 50 - (10 * i);
			
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
		var rh1DataPoints =
			document.getElementById("rh1DataPoints").getContext("2d");
		var rh2DataPoints =
			document.getElementById("rh2DataPoints").getContext("2d");
		var rh3DataPoints =
			document.getElementById("rh3DataPoints").getContext("2d");
		var timeLine = document.getElementById("rhTimeLine");
		
		rh1DataPoints.strokeStyle = this.tertiaryColor;
		rh1DataPoints.fillStyle = this.tertiaryColor;
		rh1DataPoints.lineWidth = 1;
		
		for(var i = 0; i < this.rh1Data.length-1; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + this.padding;
		
			y = this.height - (this.padding * 2);
			
			temp = this.height - (this.padding * 2);
			temp = temp / 50 * (this.rh1Data[i]);
			
			y = y - temp;
			y = y + this.padding;
		
			rh1DataPoints.moveTo(x, y);
			rh1DataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
			
			if(i == 0)
			{
				// add 15 because of the offset in the style sheet
				timeLine.style.left = x + 15 + "px";
			}
		}
		
		rh2DataPoints.strokeStyle = this.quaternaryColor;
		rh2DataPoints.fillStyle = this.quaternaryColor;
		rh2DataPoints.lineWidth = 1;
		
		for(var i = 0; i < this.rh2Data.length-1; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + this.padding;
		
			y = this.height - (this.padding * 2);
			
			temp = this.height - (this.padding * 2);
			temp = temp / 50 * (this.rh2Data[i]);
			
			y = y - temp;
			y = y + this.padding;
		
			rh2DataPoints.moveTo(x, y);
			rh2DataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
		}
		
		rh3DataPoints.strokeStyle = this.quinaryColor;
		rh3DataPoints.fillStyle = this.quinaryColor;
		rh3DataPoints.lineWidth = 1;
		
		for(var i = 0; i < this.rh3Data.length-1; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + this.padding;
		
			y = this.height - (this.padding * 2);
			
			temp = this.height - (this.padding * 2);
			temp = temp / 50 * (this.rh3Data[i]);
			
			y = y - temp;
			y = y + this.padding;
		
			rh3DataPoints.moveTo(x, y);
			rh3DataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
		}
		
		rh1DataPoints.fill();
		rh1DataPoints.stroke();
		
		rh2DataPoints.fill();
		rh2DataPoints.stroke();
		
		rh3DataPoints.fill();
		rh3DataPoints.stroke();
	};
	
	RHGraph.moveTimeLine = function()
	{
		var x;
		var timeLine = document.getElementById("rhTimeLine");
		var times = document.getElementById("timeSelect");
		
		x = this.width - (this.padding * 2);
		x = x / 11000 * (times.options[instanceTime].text - 64000);
		x = x + this.padding;
		
		// add 15 because of the offset in the style sheet
		timeLine.style.left = x + 15 + "px";
	};
}

function drawRH()
{
	var rhGraph = new RHGraph();
	
	rhGraph.readData();
	
	rhGraph.setupGraph();
	
	rhGraph.clearGraph();
	
	rhGraph.drawBorder();
	
	rhGraph.drawLegend();
	
	rhGraph.updateTitle();
	
	rhGraph.drawAxes();
	
	rhGraph.plotPoints();
}
