var width = 640;
var height = 360;

var padding = 54;

var primaryColor = "red";
var secondaryColor = "black";

var alphaHigh = 1.0;
var alphaLow = 0.2;

var data;
var largestY = -1;
var yDividers = 0;

function readData()
{
	data = document.getElementById("scatData").innerHTML.split(",");
	
	for(var i = 6; i < data.length; i++)
	{
		if(parseFloat(data[i]) > largestY)
			largestY = parseFloat(data[i]);
	}
}

function setupGraph()
{
	var graph = document.getElementById("p11Graph");
	var dataPoints = document.getElementById("p11DataPoints");
	
	graph.width = width;
	graph.height = height;
	
	dataPoints.width = width;
	dataPoints.height = height;
}

function clearGraph()
{
	var graph = document.getElementById("p11Graph").getContext("2d");
	var dataPoints = document.getElementById("p11DataPoints").getContext("2d");
	
	graph.clearRect(0, 0, graph.width, graph.height);
	dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
}

function drawBorder()
{
	var graph = document.getElementById("p11Graph").getContext("2d");
	
	graph.strokeStyle = secondaryColor;
	graph.fillStyle = secondaryColor;
	graph.lineWidth = 2;
	
	graph.moveTo(padding, padding);
	graph.lineTo(padding, (height-padding));
	
	graph.moveTo(padding, (height-padding));
	graph.lineTo((width-padding), (height-padding));
	
	graph.fill();
	graph.stroke();
}

function updateTitle()
{
	var title = document.getElementById("p11CanvasTitle");
	
	title.innerHTML = "P11 read at 175 Angles";
}

function drawAxes()
{
	var x, y, text;
	var graph = document.getElementById("p11Graph").getContext("2d");
	
	graph.fillStyle = secondaryColor;
	graph.strokeStyle = secondaryColor;
	graph.font = "bold 7pt sans-serif";
	graph.lineWidth = 1;
	
	for(var i = 0; i <= 9; i++)
	{
		x = width - (padding * 2);
		x = x / 9 * i;
		x = x + padding;
		
		text = 20 * i;
		
		graph.globalAlpha = alphaHigh;
		graph.fillText(text, (x - graph.measureText(text).width / 2), (height - padding + 20));
		
		graph.globalAlpha = alphaLow;
		graph.moveTo(x, (height - padding + 5));
		graph.lineTo(x, padding);
	}
	
	for(i = 0; Math.pow(10, (i)) < largestY; i++)
	{
		y = Math.pow(10, (i+1));
	}
	
	yDividers = i + 2;
	
	for(var j = 0; j <= (i+1); j++)
	{
		y = height - (padding * 2);
		y = y / (i+1) * j;
		y = y + padding;
		
		text = Math.pow(10, (i - j));
		
		graph.globalAlpha = alphaHigh;
		graph.fillText(text, (padding - graph.measureText(text).width - 10), (y + 3));
		
		graph.globalAlpha = alphaLow;
		graph.moveTo((padding - 5), y);
		graph.lineTo((width - padding), y);
	}
	
	graph.fill();
	graph.stroke();
}

function plotPoints()
{
	var x, y, temp;
	var dataPoints = document.getElementById("p11DataPoints").getContext("2d");
	
	dataPoints.strokeStyle = primaryColor;
	dataPoints.fillStyle = primaryColor;
	dataPoints.lineWidth = 1;
	
	for(var i = 6; i < data.length; i++)
	{
		if(data[i] > 0)
		{
			x = width - (padding * 2);
			x = x / 180 * (i - 4);
			x = x + padding;

			for(var j = 0; Math.pow(10, j) < data[i]; j++)
			{
			}

			y = height - (padding * 2);
			y = y - (y / (yDividers - 1) * j);
			y = y + padding;

			temp = height - (padding * 2);
			temp = temp / (yDividers - 1) / Math.pow(10, j);
			temp = temp * data[i];

			y = y - temp;

			dataPoints.moveTo(x, y);
			dataPoints.arc(x, y, 2, 0, (2*Math.PI), false);
		}
	}
	
	dataPoints.fill();
	dataPoints.stroke();
}

function drawP11()
{
	// Read data
	readData();
	
	// Setup graph space
	setupGraph();
	
	// Clear the current graph
	clearGraph();
	
	// Draw the border
	drawBorder();
	
	// Update the title
	updateTitle();
	
	// Draw the axes
	drawAxes();
	
	// Draw the data points
	plotPoints();
}
