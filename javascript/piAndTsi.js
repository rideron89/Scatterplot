function graphPiAndTsi()
{
	$.ajax({
		type: "POST",
		url: "php/scripts/getPiVsTsiData.php",
		success: PiAndTsiGraph,
		dataType: "text"
	});
}

function PiAndTsiGraph(output)
{
	var data = output.split("+");
	
	var piData = data[0].split(",");
	var tsiData = data[1].split(",");
	
	var width = 640;
	var height = 360;
	var padding = 64;
	var primaryColor = "green";
	var secondaryColor = "black";
	var tertiaryColor = "orange";
	var alphaHigh = 1.0;
	var alphaLow = 0.2;
	var largestY = 70;
	
	var setupGraph = function()
	{
		var graph = document.getElementById("piAndTsiGraph");
		var piDataPoints = document.getElementById("piDataPoints");
		var tsiDataPoints = document.getElementById("tsiDataPoints");
		var legend = document.getElementById("piAndTsiLegend");
		
		graph.width = width;
		graph.height = height;
		
		piDataPoints.width = width;
		piDataPoints.height = height;
		
		tsiDataPoints.width = width;
		tsiDataPoints.height = height;
		
		legend.width = 200;
		legend.height = 38;
	};
	
	var clearGraph = function()
	{
		var graph = document.getElementById("piAndTsiGraph").getContext("2d");
		var piDataPoints =
			document.getElementById("piDataPoints").getContext("2d");
		var tsiDataPoints =
			document.getElementById("tsiDataPoints").getContext("2d");
		var legend = document.getElementById("piAndTsiLegend").getContext("2d");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		piDataPoints.clearRect(0, 0, piDataPoints.width, piDataPoints.height);
		tsiDataPoints.clearRect(0, 0, tsiDataPoints.width,
			tsiDataPoints.height);
		
		legend.clearRect(0, 0, legend.width, legend.height);
	};
	
	function drawLegend()
	{
		var legend = document.getElementById("piAndTsiLegend");
		var context = legend.getContext("2d");
		
		context.globalAlpha = 1.0;
		context.fillStyle = "white";
		context.font = "bold 11pt sans-serif";
		
		context.fillRect(0, 0, legend.width, legend.height);
		
		context.globalAlpha = alphaHigh;
		
		context.beginPath();
		context.strokeStyle = primaryColor;
		context.fillStyle = primaryColor;
		context.moveTo(10, 12);
		context.arc(10, 12, 2, 0, (2*Math.PI), false);
		
		context.fill();
		context.stroke();
		
		context.beginPath();
		context.strokeStyle = tertiaryColor;
		context.fillStyle = tertiaryColor;
		context.lineWidth = 2;
		context.moveTo(4, 23);
		context.lineTo(12, 27);
		
		context.fill();
		context.stroke();
		
		context.fillStyle = "black";
		
		context.fillText("PI-Neph (532nm) total", 20, 15);
		context.fillText("TSI (550nm) total", 20, 30);
		
		context.fill();
		context.stroke();
	}
	
	var drawBorder = function()
	{
		var graph = document.getElementById("piAndTsiGraph").getContext("2d");
	
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
		var title = document.getElementById("piAndTsiCanvasTitle");
		var xAxis = document.getElementById("piAndTsiXAxisTitle");
		var yAxis = document.getElementById("piAndTsiYAxisTitle");

		title.innerHTML = "PI-Neph (532nm) total and TSI (550nm) total";
		
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Linear Scattering Coefficient, total [1/Mm]";
	};
	
	var drawAxes = function()
	{
		var x, y, text;
		var graph = document.getElementById("piAndTsiGraph").getContext("2d");
		
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
	
	var plotTsiPoints = function()
	{
		var x, y;
		var times = document.getElementById("timeSelect");
		var dataPoints =
			document.getElementById("tsiDataPoints").getContext("2d");
		
		dataPoints.strokeStyle = tertiaryColor;
		dataPoints.fillStyle = tertiaryColor;
		dataPoints.lineWidth = 2;
		
		// now graph the TSI data
		for(var i = 0; i < tsiData.length-1; i++)
		{
			if(tsiData[i] >= -10)
			{
				x = width - (padding * 2);
				x = x / 11000 * (times.options[i].text - 64000);
				x = x + padding;

				y = height - (padding * 2);
				y = y / (largestY + 10) * (largestY - tsiData[i]);
				y = y + padding;

				dataPoints.lineTo(x, y);
			}
			
			/*if(i == 0)
			{
				// add 15 because of the offset in the style sheet
				timeLine.style.left = x + 15 + "px";
			}*/
		}
		
		dataPoints.stroke();
	};
	
	var plotPiPoints = function()
	{
		var x, y;
		var times = document.getElementById("timeSelect");
		var dataPoints =
			document.getElementById("piDataPoints").getContext("2d");
		//var timeLine = document.getElementById("piAndTsiTimeLine");
		
		dataPoints.strokeStyle = primaryColor;
		dataPoints.fillStyle = primaryColor;
		dataPoints.lineWidth = 1;
		
		// graph PI data first
		for(var i = 0; i < piData.length-1; i++)
		{
			x = width - (padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + padding;
		
			y = height - (padding * 2);
			y = y / (largestY + 10) * (largestY - piData[i]);
			y = y + padding;
		
			dataPoints.moveTo(x, y);
			dataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
		}
		
		dataPoints.fill();
		dataPoints.stroke();
	};
	
	setupGraph();
	clearGraph();
	drawLegend();
	drawBorder();
	updateTitle();
	drawAxes();
	plotTsiPoints();
	plotPiPoints();
	
	if(!$("#piAndTsiCanvasDiv").is(":visible"))
		$("#piAndTsiCanvasDiv").show("blind");
}