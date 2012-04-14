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

function graphP12()
{
	currentTime = document.getElementById("timeSelect").options[time].text;
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getP11Data.php",
		data: {time: currentTime},
		success: P12Graph,
		dataType: "text"
	});
}

function P12Graph(output)
{
	var data = output.split(",");
	
	var setupGraph = function()
	{
		var graph = document.getElementById("p12Graph");
		var dataPoints = document.getElementById("p12DataPoints");
		
		graph.width = width;
		graph.height = height;
		
		dataPoints.width = width;
		dataPoints.height = height;
	};
	
	var clearGraph = function()
	{
		var graph = document.getElementById("p12Graph").getContext("2d");
		var dataPoints =
			document.getElementById("p12DataPoints").getContext("2d");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
	};
	
	var drawBorder = function()
	{
		var graph = document.getElementById("p12Graph").getContext("2d");
	
		graph.strokeStyle = secondaryColor;
		graph.fillStyle = secondaryColor;
		graph.lineWidth = 2;
	
		graph.moveTo(padding, padding);
		graph.lineTo(padding, (height - padding));
	
		graph.moveTo(padding, (height / 2));
		graph.lineTo((width - padding), (height / 2));
	
		graph.fill();
		graph.stroke();
	};
	
	var updateTitle = function()
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
	
	var drawAxes = function()
	{
		var x, y, temp, text;
		var graph = document.getElementById("p12Graph").getContext("2d");
		
		graph.fillStyle = secondaryColor;
		graph.strokeStyle = secondaryColor;
		graph.font = "bold 11pt sans-serif";
		graph.lineWidth = 1;
		
		for(var i = 0; i <= 9; i++)
		{
			x = width - (padding * 2);
			x = x / 9 * i;
			x = x + padding;
		
			text = 20 * i;
		
			graph.globalAlpha = alphaHigh;
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(height - padding + 20));
		
			graph.globalAlpha = alphaLow;
			graph.moveTo(x, (height - padding));
			graph.lineTo(x, padding);
		}
		
		y = height / 2;
		
		graph.globalAlpha = alphaHigh;
		graph.fillText("0", (padding - graph.measureText("0").width - 10),
			(y + 2));
		
		for(var i = 0; i < 5; i++)
		{
			temp = (y - padding) / 5;
			temp = temp * i;

			temp = temp + padding;
			
			text = 5 - i;
			
			graph.globalAlpha = alphaHigh;
			graph.fillText(text,
				(padding - graph.measureText(text).width - 10), temp);
			
			graph.globalAlpha = alphaLow;
			graph.moveTo((padding - 5), temp);
			graph.lineTo((width - padding), temp);
			
			temp = y;
			temp = temp + ((y - padding) / 5) * (i + 1);
			
			text = (i + 1) * -1;
			
			graph.globalAlpha = alphaHigh;
			graph.fillText(text,
				(padding - graph.measureText(text).width - 10), temp);
			
			graph.globalAlpha = alphaLow;
			graph.moveTo((padding - 5), temp);
			graph.lineTo((width - padding), temp);
		}
		
		graph.fill();
		graph.stroke();
	};
	
	var plotPoints = function()
	{
	};
	
	setupGraph();
	clearGraph();
	drawBorder();
	updateTitle();
	drawAxes();
	plotPoints();
}