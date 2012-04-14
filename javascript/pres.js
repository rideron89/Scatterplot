PresGraph.width = width = 640;
height = 360;

PresGraph.padding = padding = 64;

primaryColor = "red";
secondaryColor = "black";
tertiaryColor = "blue";

alphaHigh = 1.0;
alphaLow = 0.2;

var currentTime = 0;
data = new Array();
largestY = -1;
smallestY = 1;
yDividers = 11;

function graphPres()
{
	currentTime = document.getElementById("timeSelect").options[time].text;
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getPresData.php",
		success: PresGraph,
		dataType: "text"
	});
}

function movePresTimeLine()
{
	var x;
	var timeLine = document.getElementById("presTimeLine");
	var times = document.getElementById("timeSelect");

	x = width - (padding * 2);
	x = x / 11000 * (times.options[time].text - 64000);
	x = x + padding;

	// add 15 because of the offset in the style sheet
	timeLine.style.left = x + 15 + "px";
};

function PresGraph(output)
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
		var graph = document.getElementById("presGraph");
		var dataPoints = document.getElementById("presDataPoints");
		var timeLine = document.getElementById("presTimeLine");
		
		graph.width = width;
		graph.height = height;
		
		dataPoints.width = width;
		dataPoints.height = height;
		
		timeLine.width = 2;
		timeLine.height = height - (padding * 2);
		timeLine.style.top = padding + "px";
		
		timeLine.getContext("2d").globalAlpha = 0.5;
		timeLine.getContext("2d").fillStyle = "red";
		timeLine.getContext("2d").fillRect(0, 0, timeLine.width,
			timeLine.height);
	};
	
	function clearGraph()
	{
		var graph = document.getElementById("presGraph").getContext("2d");
		var dataPoints =
			document.getElementById("presDataPoints").getContext("2d");
		var timeLine = document.getElementById("presTimeLine");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
		
		timeLine.style.left = padding + "px";
	};
	
	function drawBorder()
	{
		var graph = document.getElementById("presGraph").getContext("2d");
	
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
		var title = document.getElementById("presCanvasTitle");
		var xAxis = document.getElementById("presXAxisTitle");
		var yAxis = document.getElementById("presYAxisTitle");

		title.innerHTML = "Pressure Inside the PI-Neph Measurement Chamber ";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Pressure Measured [Pa]";
	};
	
	function drawAxes()
	{
		var x, y, text;
		var times = document.getElementById("timeSelect");
		var graph = document.getElementById("presGraph").getContext("2d");
		
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
		
		largestY = 120;
		
		for(i = 0; i < 6; i++)
		{
			y = height - (padding * 2);
			y = y / 6 * i;
			y = y + padding;
			
			text = largestY - (20 * i) + "k";
			
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
			document.getElementById("presDataPoints").getContext("2d");
		var timeLine = document.getElementById("presTimeLine");
		
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
			temp = temp / 120 * (data[i] / 1000);
			
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