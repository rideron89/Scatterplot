function RHGraph()
{
	this.width = 640;
	this.height = 360;
	
	this.padding = 54;
	
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
		
		graph.width = this.width;
		graph.height = this.height;
		
		rh1DataPoints.width = this.width;
		rh1DataPoints.height = this.height;
		
		rh2DataPoints.width = this.width;
		rh2DataPoints.height = this.height;
		
		rh3DataPoints.width = this.width;
		rh3DataPoints.height = this.height;
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
	
		graph.clearRect(0, 0, graph.width, graph.height);
		
		rh1DataPoints.clearRect(0, 0, rh1DataPoints.width,
			rh1DataPoints.height);
		rh2DataPoints.clearRect(0, 0, rh2DataPoints.width,
			rh2DataPoints.height);
		rh3DataPoints.clearRect(0, 0, rh3DataPoints.width,
			rh3DataPoints.height);
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
	 * updateTitle()
	 *
	 * Change the title to fit our graph.
	 */
	this.updateTitle = function()
	{
		var title = document.getElementById("rhCanvasTitle");

		title.innerHTML = "Relative Humidity";
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
		
		for(var i = 0; i < 11; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 10 * i;
			x = x + this.padding;
			
			text = parseInt(64 + (1 * i)) + "k";
			
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(this.height - this.padding + 20));
		
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
		
		rh1DataPoints.strokeStyle = this.tertiaryColor;
		rh1DataPoints.fillStyle = this.tertiaryColor;
		rh1DataPoints.lineWidth = 1;
		
		for(var i = 0; i < this.rh1Data.length-1; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 10000 * (times.options[i].text - 64000);
			x = x + this.padding;
		
			y = this.height - (this.padding * 2);
			
			temp = this.height - (this.padding * 2);
			temp = temp / 50 * (this.rh1Data[i]);
			
			y = y - temp;
			y = y + this.padding;
		
			rh1DataPoints.moveTo(x, y);
			rh1DataPoints.arc(x, y, 2, 0, (2*Math.PI), false);
		}
		
		rh2DataPoints.strokeStyle = this.quaternaryColor;
		rh2DataPoints.fillStyle = this.quaternaryColor;
		rh2DataPoints.lineWidth = 1;
		
		for(var i = 0; i < this.rh2Data.length-1; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 10000 * (times.options[i].text - 64000);
			x = x + this.padding;
		
			y = this.height - (this.padding * 2);
			
			temp = this.height - (this.padding * 2);
			temp = temp / 50 * (this.rh2Data[i]);
			
			y = y - temp;
			y = y + this.padding;
		
			rh2DataPoints.moveTo(x, y);
			rh2DataPoints.arc(x, y, 2, 0, (2*Math.PI), false);
		}
		
		rh3DataPoints.strokeStyle = this.quinaryColor;
		rh3DataPoints.fillStyle = this.quinaryColor;
		rh3DataPoints.lineWidth = 1;
		
		for(var i = 0; i < this.rh3Data.length-1; i++)
		{
			x = this.width - (this.padding * 2);
			x = x / 10000 * (times.options[i].text - 64000);
			x = x + this.padding;
		
			y = this.height - (this.padding * 2);
			
			temp = this.height - (this.padding * 2);
			temp = temp / 50 * (this.rh3Data[i]);
			
			y = y - temp;
			y = y + this.padding;
		
			rh3DataPoints.moveTo(x, y);
			rh3DataPoints.arc(x, y, 2, 0, (2*Math.PI), false);
		}
		
		rh1DataPoints.fill();
		rh1DataPoints.stroke();
		
		rh2DataPoints.fill();
		rh2DataPoints.stroke();
		
		rh3DataPoints.fill();
		rh3DataPoints.stroke();
	};
}

function drawRH()
{
	var rhGraph = new RHGraph();
	
	rhGraph.readData();
	
	rhGraph.setupGraph();
	
	rhGraph.clearGraph();
	
	rhGraph.drawBorder();
	
	rhGraph.updateTitle();
	
	rhGraph.drawAxes();
	
	rhGraph.plotPoints();
}