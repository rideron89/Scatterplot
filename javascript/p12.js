function P12Graph()
{
	this.width = 640;
	this.height = 360;
	
	this.padding = 64;
	
	this.primaryColor = "red";
	this.secondaryColor = "black";
	
	this.alphaHigh = 1.0;
	this.alphaLow = 0.2;
	
	this.data = new Array();
	this.largestY = -1;
	this.yDividers = 11;
	
	/*
	 * readData()
	 *
	 * Read the data we've retrieved.
	 */
	this.readData = function()
	{
		this.data = document.getElementById("p12Data").innerHTML.split(",");
		
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
		var graph = document.getElementById("p12Graph");
		var dataPoints = document.getElementById("p12DataPoints");
		
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
		var graph = document.getElementById("p12Graph").getContext("2d");
		var dataPoints =
			document.getElementById("p12DataPoints").getContext("2d");
	
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
		var graph = document.getElementById("p12Graph").getContext("2d");
	
		graph.strokeStyle = this.secondaryColor;
		graph.fillStyle = this.secondaryColor;
		graph.lineWidth = 2;
	
		graph.moveTo(this.padding, this.padding);
		graph.lineTo(this.padding, (this.height-this.padding));
	
		graph.moveTo(this.padding, (this.height/2));
		graph.lineTo((this.width-this.padding), (this.height/2));
	
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
		var title = document.getElementById("p12CanvasTitle");
		var xAxis = document.getElementById("p12XAxisTitle");
		var yAxis = document.getElementById("p12YAxisTitle");

		title.innerHTML = "-P12/P11, aerosol only degree of linear ";
		title.innerHTML += "polarization, from 2 to 176 degrees, by 1 degree ";
		title.innerHTML += "at 532 nm";
		
		xAxis.innerHTML = "Scattering Angle [degrees]";
		yAxis.innerHTML = "-P12/P11 [unitless]";
	};
	
	/*
	 * drawAxes()
	 *
	 * Draw the axes for our graph.
	 */
	this.drawAxes = function()
	{
		var x, y, temp, text;
		var graph = document.getElementById("p12Graph").getContext("2d");
		
		graph.fillStyle = this.secondaryColor;
		graph.strokeStyle = this.secondaryColor;
		graph.font = "bold 11pt sans-serif";
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
			graph.moveTo(x, (this.height - this.padding));
			graph.lineTo(x, this.padding);
		}
		
		y = this.height / 2;
		
		graph.globalAlpha = this.alphaHigh;
		graph.fillText("0", (this.padding - graph.measureText("0").width - 10),
			(y + 2));
		
		for(var i = 0; i < 5; i++)
		{
			temp = (y - this.padding) / 5;
			temp = temp * i;

			temp = temp + this.padding;
			
			text = 5 - i;
			
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text,
				(this.padding - graph.measureText(text).width - 10), temp);
			
			graph.globalAlpha = this.alphaLow;
			graph.moveTo((this.padding - 5), temp);
			graph.lineTo((this.width - this.padding), temp);
			
			temp = y;
			temp = temp + ((y - this.padding) / 5) * (i + 1);
			
			text = (i + 1) * -1;
			
			graph.globalAlpha = this.alphaHigh;
			graph.fillText(text,
				(this.padding - graph.measureText(text).width - 10), temp);
			
			graph.globalAlpha = this.alphaLow;
			graph.moveTo((this.padding - 5), temp);
			graph.lineTo((this.width - this.padding), temp);
		}
		
		graph.fill();
		graph.stroke();
	};
	
	this.plotPoints = function()
	{
		var x, y, temp;
		var dataPoints =
			document.getElementById("p11SmallDataPoints").getContext("2d");
	
		dataPoints.strokeStyle = this.primaryColor;
		dataPoints.fillStyle = this.primaryColor;
		dataPoints.lineWidth = 1;
		
		for(var i = 6; i < this.data.length; i++)
		{
			if(this.data[i] <= 5 && this.data[i] >= -5)
			{
				x = this.width - (this.padding * 2);
				x = x / 180 * (i - 4);
				x = x + this.padding;
				
				y = this.height / 2;
				
				temp = (y - this.padding) / 5 * Math.abs(this.data[i]);
				
				if(this.data[i] > 0)
				{
					y = y - temp;
				}
				else if(this.data[i] < 0)
				{
					y = y + temp;
				}
				
				dataPoints.moveTo(x, y);
				dataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
			}
		}
		
		dataPoints.fill();
		dataPoints.stroke();
	};
}

function drawP12()
{
	var p12Graph = new P12Graph();
	
	p12Graph.readData();
	
	p12Graph.setupGraph();
	
	p12Graph.clearGraph();
	
	p12Graph.drawBorder();
	
	p12Graph.updateTitle();
	
	p12Graph.drawAxes();
	
	//p11SmallGraph.plotPoints();
}
