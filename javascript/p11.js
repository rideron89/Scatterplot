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

function graphP11()
{
	currentTime = document.getElementById("timeSelect").options[time].text;
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getP11Data.php",
		data: {time: currentTime},
		success: P11Graph,
		dataType: "text"
	});
}

function P11Graph(output)
{
	data = output.split(",");

	var setupGraph = function()
	{
		var graph = document.getElementById("p11Graph");
		var dataPoints = document.getElementById("p11DataPoints");

		graph.width = width;
		graph.height =  height;

		dataPoints.width = width;
		dataPoints.height = height;
	};

	var clearGraph = function()
	{
		var graph = document.getElementById("p11Graph").getContext("2d");
		var dataPoints =
			document.getElementById("p11DataPoints").getContext("2d");

		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
	};

	var drawBorder = function()
	{
		var graph = document.getElementById("p11Graph").getContext("2d");

		graph.strokeStyle = this.secondaryColor;
		graph.fillStyle = this.secondaryColor;
		graph.lineWidth = 2;

		graph.moveTo(padding, padding);
		graph.lineTo(padding, (height - padding));

		graph.moveTo(padding, (height - padding));
		graph.lineTo((width - padding), (height - padding));

		graph.fill();
		graph.stroke();
	};

	var updateTitle = function()
	{
		var title = document.getElementById("p11CanvasTitle");
		var xAxis = document.getElementById("p11XAxisTitle");
		var yAxis = document.getElementById("p11YAxisTitle");

		title.innerHTML = "P11, aerosol only phase function, from 2 ";
		title.innerHTML += "to 176 degrees, by 1 degree, at 532 nm";

		xAxis.innerHTML = "Scattering Angle [degrees]";
		yAxis.innerHTML = "P11 Phase Function [unitless]";
	};

	var drawAxes = function()
	{
		var x, y, text;
		var graph = document.getElementById("p11Graph").getContext("2d");

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
			graph.moveTo(x, (height - padding + 5));
			graph.lineTo(x, padding);
		}

		for(i = 0; Math.pow(10, (i)) < largestY; i++)
		{
			y = Math.pow(10, (i+1));
		}

		yDividers = i + 2;

		for(var j = 0; j < 4; j++)
		{
			y = height - (padding * 2);
			y = y / 3 * j;
			y = y + padding;

			text = Math.pow(10, (4 - j - 2));

			graph.globalAlpha = alphaHigh;
			graph.fillText(text,
				(padding - graph.measureText(text).width - 10), (y + 3));

			graph.globalAlpha = alphaLow;
			graph.moveTo((padding - 5), y);
			graph.lineTo((width - padding), y);
		}

		graph.fill();
		graph.stroke();
	};

	var plotPoints = function()
	{
		var x, y, temp, log;
		var dataPoints =
			document.getElementById("p11DataPoints").getContext("2d");

		dataPoints.strokeStyle = primaryColor;
		dataPoints.fillStyle = primaryColor;
		dataPoints.lineWidth = 1;

		for(var i = 6; i < data.length; i++)
		{
			log = Math.log(data[i]) - Math.log(0.1);
			log /= Math.log(100) - Math.log(0.1);

			x = width - (padding * 2);
			x = (x / 180) * (i - 4);
			x = x + padding;

			y = height - (padding * 2);
			temp = y / 10;
			temp = temp * (log * 10);
			y = y - temp;
			y = y + padding;

			if(data[i] >= 0.1 && data[i] <= 100)
			{
				dataPoints.moveTo(x, y);
				dataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
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