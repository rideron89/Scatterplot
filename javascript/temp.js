TempGraph.width = width = 640;
height = 360;

TempGraph.padding = padding = 64;

primaryColor = "red";
secondaryColor = "black";
tertiaryColor = "blue";

alphaHigh = 1.0;
alphaLow = 0.2;

var currentTime = 0;
data = new Array();
largestY = -1;
yDividers = 11;

function graphTemp()
{
	currentTime = document.getElementById("timeSelect").options[time].text;
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getTempData.php",
		success: TempGraph,
		dataType: "text"
	});
}

function moveTempTimeLine()
{
	var x;
	var timeLine = document.getElementById("tempTimeLine");
	var times = document.getElementById("timeSelect");

	x = width - (padding * 2);
	x = x / 11000 * (times.options[time].text - 64000);
	x = x + padding;

	// add 15 because of the offset in the style sheet
	timeLine.style.left = x + 15 + "px";
};

function TempGraph(output)
{
	data = output.split(",");
	
	for(var i = 0; i < data.length; i++)
	{
		if(parseFloat(data[i]) > largestY)
		{
			largestY = parseFloat(data[i]);
		}
	}
	
	function setupGraph()
	{
		var graph = document.getElementById("tempGraph");
		var dataPoints = document.getElementById("tempDataPoints");
		var timeLine = document.getElementById("tempTimeLine");
		
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
		var graph = document.getElementById("tempGraph").getContext("2d");
		var dataPoints =
			document.getElementById("tempDataPoints").getContext("2d");
		var timeLine = document.getElementById("tempTimeLine");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
		
		timeLine.style.left = padding + "px";
	};
	
	function drawBorder()
	{
		var graph = document.getElementById("tempGraph").getContext("2d");
	
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
		var title = document.getElementById("tempCanvasTitle");
		var xAxis = document.getElementById("tempXAxisTitle");
		var yAxis = document.getElementById("tempYAxisTitle");

		title.innerHTML = "Temperature Inside the PI-Neph Measurement Chamber ";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Temperature Measured [deg C]";
	};
	
	function drawAxes()
	{
		var x, y, text;
		var times = document.getElementById("timeSelect");
		var graph = document.getElementById("tempGraph").getContext("2d");
		
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
		
		for(i = 0; i < 5; i++)
		{
			y = height - (padding * 2);
			y = y / 3 * i;
			y = y + padding;
			
			text = 40 - (10 * i);
			
			graph.globalAlpha = alphaHigh;
			graph.fillText(text,
				(padding - graph.measureText(text).width - 10), (y + 4));
			
			graph.globalAlpha = alphaLow;
			graph.moveTo((padding - 5), y);
			graph.lineTo((width - padding), y);
		}
		
		graph.fill();
		graph.stroke();
	};
	
	function plotPoints()
	{
		var x, y, temp;
		var times = document.getElementById("timeSelect");
		var dataPoints =
			document.getElementById("tempDataPoints").getContext("2d");
		var timeLine = document.getElementById("tempTimeLine");
		
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
			temp = temp / 30 * (data[i] - 10);
			
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
	
	if(!$("#tempCanvasDiv").is(":visible"))
		$("#tempCanvasDiv").show("blind");
}