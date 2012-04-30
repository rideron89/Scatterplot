function graphP12()
{
	var currentTime = document.getElementById("timeSelect").options[time].text;
	
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
	var width = 640;
	var height = 360;
	var padding = 64;
	var primaryColor = "red";
	var secondaryColor = "black";
	var alphaHigh = 1.0;
	var alphaLow = 0.2;
	
	var data = output.split(",");
	var graph = document.getElementById("p12Graph");
	var dataPoints = document.getElementById("p12DataPoints");
	var context = null;
	
	var setupGraph = function()
	{
		graph.width = width;
		graph.height = height;
		
		dataPoints.width = width;
		dataPoints.height = height;
	};
	
	var clearGraph = function()
	{
		context = graph.getContext("2d");
		context.clearRect(0, 0, context.width, context.height);
		
		context = dataPoints.getContext("2d");
		context.clearRect(0, 0, context.width, context.height);
	};
	
	var drawBorder = function()
	{
		context = graph.getContext("2d");
	
		context.strokeStyle = secondaryColor;
		context.fillStyle = secondaryColor;
		context.lineWidth = 2;
	
		context.moveTo(padding, padding);
		context.lineTo(padding, (height - padding));
	
		context.moveTo(padding, (height / 2));
		context.lineTo((width - padding), (height / 2));
	
		context.fill();
		context.stroke();
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
		
		context = graph.getContext("2d");
		
		context.fillStyle = secondaryColor;
		context.strokeStyle = secondaryColor;
		context.font = "bold 11pt sans-serif";
		context.lineWidth = 1;
		
		for(var i = 0; i <= 9; i++)
		{
			x = width - (padding * 2);
			x = x / 9 * i;
			x = x + padding;
		
			text = 20 * i;
		
			context.globalAlpha = alphaHigh;
			context.fillText(text, (x - context.measureText(text).width / 2),
				(height - padding + 20));
		
			context.globalAlpha = alphaLow;
			context.moveTo(x, (height - padding));
			context.lineTo(x, padding);
		}
		
		y = height / 2;
		
		context.globalAlpha = alphaHigh;
		context.fillText("0", (padding - context.measureText("0").width - 10),
			(y + 2));
		
		for(var i = 0; i < 5; i++)
		{
			temp = (y - padding) / 5;
			temp = temp * i;

			temp = temp + padding;
			
			text = 5 - i;
			
			context.globalAlpha = alphaHigh;
			context.fillText(text,
				(padding - context.measureText(text).width - 10), temp);
			
			context.globalAlpha = alphaLow;
			context.moveTo((padding - 5), temp);
			context.lineTo((width - padding), temp);
			
			temp = y;
			temp = temp + ((y - padding) / 5) * (i + 1);
			
			text = (i + 1) * -1;
			
			context.globalAlpha = alphaHigh;
			context.fillText(text,
				(padding - context.measureText(text).width - 10), temp);
			
			context.globalAlpha = alphaLow;
			context.moveTo((padding - 5), temp);
			context.lineTo((width - padding), temp);
		}
		
		context.fill();
		context.stroke();
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
	
	if(!$("#p12CanvasDiv").is(":visible"))
		$("#p12CanvasDiv").show("blind");
}
