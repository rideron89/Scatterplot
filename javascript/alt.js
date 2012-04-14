var width = 640;
var height = 360;

var padding = 64;

var primaryColor = "red";
var secondaryColor = "black";
var tertiaryColor = "blue";

var alphaHigh = 1.0;
var alphaLow = 0.2;

var currentTime = 0;
var data = new Array();
var largestY = -1;
var smallestY = 1;
var yDividers = 11;

function graphAlt()
{
	currentTime = document.getElementById("timeSelect").options[time].text;
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getAltData.php",
		success: AltGraph,
		dataType: "text"
	});
}

function moveAltTimeLine()
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

function AltGraph(output)
{
	data = output.split(",");
	
	smallestY = data[0];

	for(var i = 0; i < data.length; i++)
	{
		if(parseFloat(data[i]) > largestY)
		{
			largestY = parseFloat(data[i]);
		}

		if(parseFloat(data[i]) < smallestY)
		{
			smallestY = parseFloat(data[i]);
		}
	}
	
	function setupGraph()
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
	
	function clearGraph()
	{
		var graph = document.getElementById("altGraph").getContext("2d");
		var dataPoints =
			document.getElementById("altDataPoints").getContext("2d");
		var timeLine = document.getElementById("altTimeLine");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
		
		timeLine.style.left = padding + "px";
	};
	
	function drawBorder()
	{
		var graph = document.getElementById("altGraph").getContext("2d");
	
		graph.strokeStyle = secondaryColor;
		graph.fillStyle = secondaryColor;
		graph.lineWidth = 2;
	
		graph.moveTo(padding, padding);
		graph.lineTo(padding, (height-padding));
	
		graph.moveTo(padding, (height-padding));
		graph.lineTo((width-padding), (height-padding));
	
		graph.fill();
		graph.stroke();
	};
	
	function updateTitle()
	{
		var title = document.getElementById("altCanvasTitle");
		var xAxis = document.getElementById("altXAxisTitle");
		var yAxis = document.getElementById("altYAxisTitle");

		title.innerHTML = "GPS Altitude";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Altitude [feet]";
	};
	
	function drawAxes()
	{
		var x, y, text;
		var times = document.getElementById("timeSelect");
		var graph = document.getElementById("altGraph").getContext("2d");
		
		graph.fillStyle = secondaryColor;
		graph.strokeStyle = secondaryColor;
		graph.font = "bold 11pt sans-serif";
		graph.lineWidth = 1;
		
		for(var i = 0; i < 12; i++)
		{
			x = width - (padding * 2);
			x = x / 11 * i;
			x = x + padding;
			
			text = parseInt(64 + (1 * i)) + "k";
			
			graph.globalAlpha = alphaHigh;
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(height - padding + 20));
			
			graph.globalAlpha = 0.6;
			text = secondsToCalendarHHMM(parseInt(64 + (1 * i)) * 1000);
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(height-  padding + 35));
		
			graph.globalAlpha = alphaLow;
			graph.moveTo(x, (height - padding + 5));
			graph.lineTo(x, padding);
		}
		
		largestY = 16;
		
		for(i = 0; i < 8; i++)
		{
			y = height - (padding * 2);
			y = y / 8 * i;
			y = y + padding;
			
			text = largestY - (i * 2) + "k";
			
			graph.globalAlpha = alphaHigh;
			graph.fillText(text,
				(padding - graph.measureText(text).width - 10), (y + 4));
			
			graph.globalAlpha = alphaLow;
			graph.moveTo((padding - 5), y);
			graph.lineTo((width - padding), y);
		}
		
		y = height - padding;
		text = "0";
		
		graph.globalAlpha = alphaHigh;
		graph.fillText(text,
			(padding - graph.measureText(text).width - 10), y);
		
		graph.globalAlpha = alphaLow;
		graph.moveTo((padding - 5), y);
		graph.lineTo((width - padding), y);
		
		graph.fill();
		graph.stroke();
	};
	
	function plotPoints()
	{
		var x, y, temp;
		var times = document.getElementById("timeSelect");
		var dataPoints =
			document.getElementById("altDataPoints").getContext("2d");
		var timeLine = document.getElementById("altTimeLine");
		
		dataPoints.strokeStyle = tertiaryColor;
		dataPoints.fillStyle = tertiaryColor;
		dataPoints.lineWidth = 1;
		
		for(var i = 0; i < data.length-1; i++)
		{
			x = width - (padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + padding;
		
			y = height - (padding * 2);
			
			temp = height - (padding * 2);
			temp = temp / 16 * (data[i] / 1000);
			
			y = y - temp;
			y = y + padding;
		
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
	
	setupGraph();
	clearGraph();
	drawBorder();
	updateTitle();
	drawAxes();
	plotPoints();
}