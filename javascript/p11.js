function P11Graph()
{
	this.width = 640;
	this.height = 360;
	
	this.padding = 54;
	
	this.primaryColor = "red";
	this.secondaryColor = "black";
	
	this.alphaHigh = 1.0;
	this.alphaLow = 0.2;
	
	this.data = new Array();
	this.largestY = -1;
	this.yDividers = 0;
	
	/*
	 * readData()
	 *
	 * Read the data we've retrieved.
	 */
	this.readData = function()
	{
		this.data = document.getElementById("p11Data").innerHTML.split(",");
		
		for(var i = 6; i < this.data.length; i++)
		{
			if(parseFloat(this.data[i]) > this.largestY)
				this.largestY = parseFloat(this.data[i]);
		}
	};
	
	/*
	 * setupGraph()
	 *
	 * Initialize the graph space.
	 */
	this.setupGraph = function()
	{
		var graph = document.getElementById("p11Graph");
		var dataPoints = document.getElementById("p11DataPoints");
		
		graph.width = this.width;
		graph.height = this.height;
		
		dataPoints.width = this.width;
		dataPoints.height = this.height;
	};
	
	/*
	 * clearGraph()
	 *
	 * Clear the graph space.
	 */
	this.clearGraph = function()
	{
		var graph = document.getElementById("p11Graph").getContext("2d");
		var dataPoints = document.getElementById("p11DataPoints").getContext("2d");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
	};
	
	/*
	 * drawBorder()
	 *
	 * Draw the graph's border.
	 */
	this.drawBorder = function()
	{
		var graph = document.getElementById("p11Graph").getContext("2d");
	
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
		var title = document.getElementById("p11CanvasTitle");
		var xAxis = document.getElementById("p11XAxisTitle");
		var yAxis = document.getElementById("p11YAxisTitle");

		title.innerHTML = "P11 read at 175 Angles";
		xAxis.innerHTML = "Scattering Angle [degrees]";
		yAxis.innerHTML = "P11 Phase Function [unitless]";
	};
	
	/*
	 * drawAxes()
	 *
	 * Draw the axes for our graph.
	 */
	this.drawAxes = function()
	{
		var x, y, text;
		var graph = document.getElementById("p11Graph").getContext("2d");
	
		graph.fillStyle = this.secondaryColor;
		graph.strokeStyle = this.secondaryColor;
		graph.font = "bold 7pt sans-serif";
		graph.lineWidth = 1;
	
		for(var i = 0; i <= 9; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 9 * i;
			x = x + this.padding;
		
			text = 20 * i;
		
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text, (x - graph.measureText(text).width / 2), (this.height - this.padding + 20));
		
			graph.globalAlpha = this.alphaLow;
			graph.moveTo(x, (this.height - this.padding + 5));
			graph.lineTo(x, this.padding);
		}
	
		for(i = 0; Math.pow(10, (i)) < this.largestY; i++)
		{
			y = Math.pow(10, (i+1));
		}
	
		this.yDividers = i + 2;
	
		for(var j = 0; j <= (i+1); j++)
		{
			y = this.height - (this.padding * 2);
			y = y / (i+1) * j;
			y = y + this.padding;
		
			text = Math.pow(10, (i - j));
		
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text, (this.padding - graph.measureText(text).width - 10), (y + 3));
		
			graph.globalAlpha = this.alphaLow;
			graph.moveTo((this.padding - 5), y);
			graph.lineTo((this.width - this.padding), y);
		}
	
		graph.fill();
		graph.stroke();
	};
	
	/*
	 * plotPoints()
	 *
	 * Graph the data points from our readings.
	 */
	this.plotPoints = function()
	{
		var x, y, temp;
		var dataPoints = document.getElementById("p11DataPoints").getContext("2d");
	
		dataPoints.strokeStyle = this.primaryColor;
		dataPoints.fillStyle = this.primaryColor;
		dataPoints.lineWidth = 1;
	
		for(var i = 6; i < this.data.length; i++)
		{
			if(this.data[i] > 0)
			{
				x = this.width - (this.padding * 2);
				x = x / 180 * (i - 4);
				x = x + this.padding;

				for(var j = 0; Math.pow(10, j) < this.data[i]; j++)
				{
				}

				y = this.height - (this.padding * 2);
				y = y - (y / (this.yDividers - 1) * j);
				y = y + this.padding;

				temp = this.height - (this.padding * 2);
				temp = temp / (this.yDividers - 1) / Math.pow(10, j);
				temp = temp * this.data[i];

				y = y - temp;

				dataPoints.moveTo(x, y);
				dataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
			}
		}
	
		dataPoints.fill();
		dataPoints.stroke();
	};
}

function drawP11()
{
	var p11Graph = new P11Graph();
	
	// Read data
	p11Graph.readData();
	
	// Setup graph space
	p11Graph.setupGraph();
	
	// Clear the current graph
	p11Graph.clearGraph();
	
	// Draw the border
	p11Graph.drawBorder();
	
	// Update the title
	p11Graph.updateTitle();
	
	// Draw the axes
	p11Graph.drawAxes();
	
	// Draw the data points
	p11Graph.plotPoints();
}
