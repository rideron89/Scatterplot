var width = 640;
var height = 360;

var padding = 64;

var primaryColor = "red";
var secondaryColor = "black";

var alphaHigh = 1.0;
var alphaLow = 0.2;

var currentTime = 0;
var data = new Array();
var largestY = -1;
var yDividers = 11;

function graphScat()
{
	currentTime = document.getElementById("timeSelect").options[time].text;
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getScatData.php",
		success: ScatGraph,
		dataType: "text"
	});
}

function moveScatTimeLine()
{
	var x;
	var timeLine = document.getElementById("scatTimeLine");
	var times = document.getElementById("timeSelect");

	x = this.width - (this.padding * 2);
	x = x / 11000 * (times.options[time].text - 64000);
	x = x + this.padding;

	// add 15 because of the offset in the style sheet
	timeLine.style.left = x + 15 + "px";
};

function ScatGraph(output)
{
	data = output.split(",");
	
	for(var i = 0; i < data.length; i++)
	{
		if(parseFloat(data[i]) > largestY)
		{
			largestY = parseFloat(data[i]);
		}
	}
	
	var setupGraph = function()
	{
		var graph = document.getElementById("scatGraph");
		var dataPoints = document.getElementById("scatDataPoints");
		var timeLine = document.getElementById("scatTimeLine");
		
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
	
	var clearGraph = function()
	{
		var graph = document.getElementById("scatGraph").getContext("2d");
		var dataPoints =
			document.getElementById("scatDataPoints").getContext("2d");
		var timeLine = document.getElementById("scatTimeLine");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
		
		timeLine.style.left = padding + "px";
	};
	
	var drawBorder = function()
	{
		var graph = document.getElementById("scatGraph").getContext("2d");
	
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
	
	var updateTitle = function()
	{
		var title = document.getElementById("scatCanvasTitle");
		var xAxis = document.getElementById("scatXAxisTitle");
		var yAxis = document.getElementById("scatYAxisTitle");

		title.innerHTML = "Linear Scattering Coefficient at 532nm ";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Scattering Coefficient of Aerosol [1/Mm]";
	};
	
	var drawAxes = function()
	{
		var x, y, text;
		var times = document.getElementById("timeSelect");
		var graph = document.getElementById("scatGraph").getContext("2d");
		
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
		
		largestY += largestY * 0.10;
		largestY -= largestY % 10;
		largestY += 10;
		
		for(i = 0; i <= (largestY / 10); i++)
		{
			y = height - (padding * 2);
			y = y / (largestY / 10 + 1) * i;
			y = y + padding;
			
			text = parseInt(largestY - (i * 10));
			
			graph.globalAlpha = alphaHigh;
			graph.fillText(text,
				(padding - graph.measureText(text).width - 10), (y + 4));
			
			graph.globalAlpha = alphaLow;
			graph.moveTo((padding - 5), y);
			graph.lineTo((width - padding), y);
		}
		
		y = height - padding;
		
		text = "-10";
		graph.globalAlpha = alphaHigh;
		graph.fillText(text,
			(padding - graph.measureText(text).width - 10), y);
		
		graph.globalAlpha = alphaLow;
		graph.moveTo((padding - 5), y);
		graph.lineTo((width - padding), y);
		
		graph.fill();
		graph.stroke();
	};
	
	var plotPoints = function()
	{
		var x, y;
		var times = document.getElementById("timeSelect");
		var dataPoints =
			document.getElementById("scatDataPoints").getContext("2d");
		var timeLine = document.getElementById("scatTimeLine");
		
		dataPoints.strokeStyle = tertiaryColor;
		dataPoints.fillStyle = tertiaryColor;
		dataPoints.lineWidth = 1;
		
		for(var i = 0; i < data.length-1; i++)
		{
			x = width - (padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + padding;
		
			y = height - (padding * 2);
			y = y / (largestY + 10) * (largestY - data[i]);
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