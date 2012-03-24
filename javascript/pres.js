function PresGraph()
{
	this.width = 640;
	this.height = 360;
	
	this.padding = 54;
	
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
		this.data = document.getElementById("presData").innerHTML.split(",");
		
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
		var graph = document.getElementById("presGraph");
		var dataPoints = document.getElementById("presDataPoints");
		
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
		var graph = document.getElementById("presGraph").getContext("2d");
		var dataPoints = document.getElementById("presDataPoints").getContext("2d");
	
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
		var graph = document.getElementById("presGraph").getContext("2d");
	
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
		var title = document.getElementById("presCanvasTitle");

		title.innerHTML = "Pressure";
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
		var graph = document.getElementById("presGraph").getContext("2d");
		
		graph.fillStyle = this.secondaryColor;
		graph.strokeStyle = this.secondaryColor;
		graph.font = "bold 7pt sans-serif";
		graph.lineWidth = 1;
		
		for(var i = 0; i < 11; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 10 * i;
			x = x + this.padding;
			
			text = times.options[i*69].text;
			
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(this.height - this.padding + 20));
		
			graph.globalAlpha = this.alphaLow;
			graph.moveTo(x, (this.height - this.padding + 5));
			graph.lineTo(x, this.padding);
		}
		
		this.largestY = 150;
		
		for(i = 0; i < 10; i++)
		{
			y = this.height - (this.padding * 2);
			y = y / 10 * i;
			y = y + this.padding;
			
			text = this.largestY - (15 * i) + "k";
			//text = parseInt(this.largestY - (this.smallestY * i));
			
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
			document.getElementById("presDataPoints").getContext("2d");
		
		dataPoints.strokeStyle = this.tertiaryColor;
		dataPoints.fillStyle = this.tertiaryColor;
		dataPoints.lineWidth = 1;
		
		for(var i = 0; i < this.data.length-1; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / times.options.length * i;
			x = x + this.padding;
		
			y = this.height - (this.padding * 2);
			
			temp = this.height - (this.padding * 2);
			temp = temp / 150 * (this.data[i] / 1000);
			
			y = y - temp;
			y = y + this.padding;
		
			dataPoints.moveTo(x, y);
			dataPoints.arc(x, y, 2, 0, (2*Math.PI), false);
		}
		
		dataPoints.fill();
		dataPoints.stroke();
	};
}

function drawPres()
{
	var presGraph = new PresGraph();
	
	presGraph.readData();
	
	presGraph.setupGraph();
	
	presGraph.clearGraph();
	
	presGraph.drawBorder();
	
	presGraph.updateTitle();
	
	presGraph.drawAxes();
	
	presGraph.plotPoints();
}
