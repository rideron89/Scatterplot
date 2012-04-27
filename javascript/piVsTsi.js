function graphPiVsTsi()
{
	var currentTime = document.getElementById("timeSelect").options[time].text;
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getPiVsTsiData.php",
		data: {time: currentTime, nm: 550},
		success: PiVsTsiGraph,
		dataType: "text"
	});
}

function PiVsTsiGraph(output)
{
	var data = output.split("+");
	
	var piData = data[0].split(",");
	var tsiData = data[1].split(",");
	
	var width = 640;
	var height = 360;
	var padding = 64;
	var primaryColor = "purple";
	var secondaryColor = "black";
	var alphaHigh = 1.0;
	var alphaLow = 0.2;
	
	var setupGraph = function()
	{
		var graph = document.getElementById("piVsTsiGraph");
		var dataPoints = document.getElementById("piVsTsiDataPoints");
		
		graph.width = width;
		graph.height = height;
		
		dataPoints.width = width;
		dataPoints.height = height;
	};
	
	var clearGraph = function()
	{
		var graph = document.getElementById("piVsTsiGraph").getContext("2d");
		var dataPoints =
			document.getElementById("piVsTsiDataPoints").getContext("2d");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		dataPoints.clearRect(0, 0, dataPoints.width, dataPoints.height);
	};
	
	var drawBorder = function()
	{
		var graph = document.getElementById("piVsTsiGraph").getContext("2d");
	
		graph.strokeStyle = secondaryColor;
		graph.fillStyle = secondaryColor;
		graph.lineWidth = 2;
	
		graph.moveTo(padding, padding);
		graph.lineTo(padding, (height - padding));
		
		graph.moveTo((width - padding), padding);
		graph.lineTo((width - padding), (height - padding));
	
		graph.moveTo(padding, (height - padding));
		graph.lineTo((width - padding), (height - padding));
		
		graph.moveTo(padding, padding);
		graph.lineTo((width - padding), padding);
	
		graph.fill();
		graph.stroke();
	};
	
	var updateTitle = function()
	{
		var title = document.getElementById("piVsTsiCanvasTitle");
		var xAxis = document.getElementById("piVsTsiXAxisTitle");
		var yAxis = document.getElementById("piVsTsiYAxisTitle");

		title.innerHTML = "PI-Neph (532nm) total vs. TSI (550nm) total";
		
		xAxis.innerHTML = "PI-Neph Scattering Coefficient of Aerosol [1/Mm]";
		yAxis.innerHTML = "TSI Scattering Coefficient of Aerosol [1/Mm]";
	};
	
	var drawAxes = function()
	{
		var x, y, temp, text;
		var graph = document.getElementById("piVsTsiGraph").getContext("2d");
		
		graph.fillStyle = secondaryColor;
		graph.strokeStyle = secondaryColor;
		graph.font = "bold 11pt sans-serif";
		graph.lineWidth = 1;
		
		for(var i = 0; i < 9; i++)
		{
			x = width - (padding * 2);
			x = x / 8 * i;
			x = x + padding;
		
			text = -10 + (10 * i);
		
			graph.globalAlpha = alphaHigh;
			graph.fillText(text, (x - graph.measureText(text).width / 2),
				(height - padding + 20));
		
			graph.globalAlpha = alphaLow;
			graph.moveTo(x, (height - padding));
			graph.lineTo(x, padding);
		}
		
		for(var i = 0; i < 9; i++)
		{
			y = height - (padding * 2);
			y = y / 8 * i;
			y = y + padding;
		
			text = 70 - (10 * i);
		
			graph.globalAlpha = alphaHigh;
			graph.fillText(text, (padding - graph.measureText(text).width - 10),
				y);
			
			graph.globalAlpha = alphaLow;
			graph.moveTo((padding - 5), y);
			graph.lineTo((width - padding), y);
		}
		
		graph.fill();
		graph.stroke();
	};
	
	var plotPoints = function()
	{
		var x, y;
		var dataPoints =
			document.getElementById("piVsTsiDataPoints").getContext("2d");
	
		dataPoints.strokeStyle = primaryColor;
		dataPoints.fillStyle = primaryColor;
		dataPoints.lineWidth = 1;
		
		for(var i = 6; i < piData.length; i++)
		{
			x = width - (padding * 2);
			x = (x / 80 * 10) + (x / 80 * piData[i]);
			x = x + padding;
			
			y = height - (padding * 2);
			y = (y / 80 * 10) + (y / 80 * (60 - tsiData[i]));
			y = y + padding;
			
			dataPoints.moveTo(x, y);
			dataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
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
	
	if(!$("#piVsTsiCanvasDiv").is(":visible"))
		$("#piVsTsiCanvasDiv").show("blind");
}