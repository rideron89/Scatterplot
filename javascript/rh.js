var width = 640;
height = 360;

var padding = 64;

var primaryColor = "red";
var secondaryColor = "black";
var tertiaryColor = "green";
var quaternaryColor = "orange";
var quinaryColor = "purple";

alphaHigh = 1.0;
alphaLow = 0.2;

var currentTime = 0;
rh1Data = new Array();
rh2Data = new Array();
rh3Data = new Array();
largestY = -1;
yDividers = 11;

function graphRH()
{
	currentTime = document.getElementById("timeSelect").options[time].text;
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getRHData.php",
		success: RHGraph,
		dataType: "text"
	});
}

function moveRHTimeLine()
{
	var x;
	var timeLine = document.getElementById("rhTimeLine");
	var times = document.getElementById("timeSelect");

	x = width - (padding * 2);
	x = x / 11000 * (times.options[time].text - 64000);
	x = x + padding;

	// add 15 because of the offset in the style sheet
	timeLine.style.left = x + 15 + "px";
};

function RHGraph(output)
{
	var data = output.split("+");
	
	rh1Data = data[0].split(",");
	rh2Data = data[1].split(",");
	rh3Data = data[2].split(",");
	
	function setupGraph()
	{
		var graph = document.getElementById("rhGraph");
		var rh1DataPoints = document.getElementById("rh1DataPoints");
		var rh2DataPoints = document.getElementById("rh2DataPoints");
		var rh3DataPoints = document.getElementById("rh3DataPoints");
		var timeLine = document.getElementById("rhTimeLine");
		var legend = document.getElementById("rhLegend");
		
		graph.width = width;
		graph.height = height;
		
		rh1DataPoints.width = width;
		rh1DataPoints.height = height;
		
		rh2DataPoints.width = width;
		rh2DataPoints.height = height;
		
		rh3DataPoints.width = width;
		rh3DataPoints.height = height;
		
		timeLine.width = 2;
		timeLine.height = height - (padding * 2);
		timeLine.style.top = padding + "px";
		
		timeLine.getContext("2d").globalAlpha = 0.6;
		timeLine.getContext("2d").fillStyle = "red";
		timeLine.getContext("2d").fillRect(0, 0, timeLine.width,
			timeLine.height);
		
		legend.width = 210;
		legend.height = 52;
	};
	
	function clearGraph()
	{
		var graph = document.getElementById("rhGraph").getContext("2d");
		var rh1DataPoints =
			document.getElementById("rh1DataPoints").getContext("2d");
		var rh2DataPoints =
			document.getElementById("rh2DataPoints").getContext("2d");
		var rh3DataPoints =
			document.getElementById("rh3DataPoints").getContext("2d");
		var timeLine = document.getElementById("rhTimeLine");
		var legend = document.getElementById("rhLegend").getContext("2d");
	
		graph.clearRect(0, 0, graph.width, graph.height);
		
		rh1DataPoints.clearRect(0, 0, rh1DataPoints.width,
			rh1DataPoints.height);
		rh2DataPoints.clearRect(0, 0, rh2DataPoints.width,
			rh2DataPoints.height);
		rh3DataPoints.clearRect(0, 0, rh3DataPoints.width,
			rh3DataPoints.height);
		
		timeLine.style.left = padding + "px";
		
		legend.clearRect(0, 0, legend.width, legend.height);
	};
	
	/*
	 * drawBorder()
	 *
	 * Draw the graph's border.
	 */
	function drawBorder()
	{
		var graph = document.getElementById("rhGraph").getContext("2d");
	
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
	
	/*
	 * drawLegend()
	 * 
	 * Draw the graph's legend.
	 */
	function drawLegend()
	{
		var legend = document.getElementById("rhLegend");
		var context = legend.getContext("2d");
		
		context.globalAlpha = 0.7;
		context.fillStyle = "white";
		context.font = "bold 11pt sans-serif";
		
		context.fillRect(0, 0, legend.width, legend.height);
		
		context.globalAlpha = alphaHigh;
		
		context.beginPath();
		context.strokeStyle = tertiaryColor;
		context.fillStyle = tertiaryColor;
		context.moveTo(10, 12);
		context.arc(10, 12, 2, 0, (2*Math.PI), false);
		
		context.fill();
		context.stroke();
		
		context.beginPath();
		context.strokeStyle = quaternaryColor;
		context.fillStyle = quaternaryColor;
		context.moveTo(10, 27);
		context.arc(10, 27, 2, 0, (2*Math.PI), false);
		
		context.fill();
		context.stroke();
		
		context.beginPath();
		context.strokeStyle = quinaryColor;
		context.fillStyle = quinaryColor;
		context.moveTo(10, 42);
		context.arc(10, 42, 2, 0, (2*Math.PI), false);
		
		context.fill();
		context.stroke();
		
		context.fillStyle = "black";
		
		context.fillText("RH1, before PI-Neph inlet", 20, 15);
		context.fillText("RH2, inside PI-Neph inlet", 20, 30);
		context.fillText("RH3, after PI-Neph inlet", 20, 45);
		
		context.fill();
		context.stroke();
	}
	
	function updateTitle()
	{
		var title = document.getElementById("rhCanvasTitle");
		var xAxis = document.getElementById("rhXAxisTitle");
		var yAxis = document.getElementById("rhYAxisTitle");

		title.innerHTML = "Relative Humidity";
		xAxis.innerHTML = "Time From Previous Midnight UTC [sec]";
		yAxis.innerHTML = "Relative Humidity [%]";
	};
	
	function drawAxes()
	{
		var x, y, text;
		var times = document.getElementById("timeSelect");
		var graph = document.getElementById("rhGraph").getContext("2d");
		
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
		
		for(i = 0; i < 6; i++)
		{
			y = height - (padding * 2);
			y = y / 5 * i;
			y = y + padding;
			
			text = 50 - (10 * i);
			
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
		var rh1DataPoints =
			document.getElementById("rh1DataPoints").getContext("2d");
		var rh2DataPoints =
			document.getElementById("rh2DataPoints").getContext("2d");
		var rh3DataPoints =
			document.getElementById("rh3DataPoints").getContext("2d");
		var timeLine = document.getElementById("rhTimeLine");
		
		rh1DataPoints.strokeStyle = tertiaryColor;
		rh1DataPoints.fillStyle = tertiaryColor;
		rh1DataPoints.lineWidth = 1;
		
		for(var i = 0; i < rh1Data.length-1; i++)
		{
			x = width - (padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + padding;
		
			y = height - (padding * 2);
			
			temp = height - (padding * 2);
			temp = temp / 50 * (rh1Data[i]);
			
			y = y - temp;
			y = y + padding;
		
			rh1DataPoints.moveTo(x, y);
			rh1DataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
			
			if(i == 0)
			{
				// add 15 because of the offset in the style sheet
				timeLine.style.left = x + 15 + "px";
			}
		}
		
		rh2DataPoints.strokeStyle = quaternaryColor;
		rh2DataPoints.fillStyle = quaternaryColor;
		rh2DataPoints.lineWidth = 1;
		
		for(var i = 0; i < rh2Data.length-1; i++)
		{
			x = width - (padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + padding;
		
			y = height - (padding * 2);
			
			temp = height - (padding * 2);
			temp = temp / 50 * (rh2Data[i]);
			
			y = y - temp;
			y = y + padding;
		
			rh2DataPoints.moveTo(x, y);
			rh2DataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
		}
		
		rh3DataPoints.strokeStyle = quinaryColor;
		rh3DataPoints.fillStyle = quinaryColor;
		rh3DataPoints.lineWidth = 1;
		
		for(var i = 0; i < rh3Data.length-1; i++)
		{
			x = width - (padding * 2);
			x = x / 11000 * (times.options[i].text - 64000);
			x = x + padding;
		
			y = height - (padding * 2);
			
			temp = height - (padding * 2);
			temp = temp / 50 * (rh3Data[i]);
			
			y = y - temp;
			y = y + padding;
		
			rh3DataPoints.moveTo(x, y);
			rh3DataPoints.arc(x, y, 1.5, 0, (2*Math.PI), false);
		}
		
		rh1DataPoints.fill();
		rh1DataPoints.stroke();
		
		rh2DataPoints.fill();
		rh2DataPoints.stroke();
		
		rh3DataPoints.fill();
		rh3DataPoints.stroke();
	};
	
	setupGraph();
	clearGraph();
	drawBorder();
	drawLegend();
	updateTitle();
	drawAxes();
	plotPoints();
}