/*
 * Canvas "Class" constructor
 */
function Scatterplot(id1, id2)
{
	this.elementId1 = id1;
	this.elementId2 = id2;
	this.canvas = null;
	this.context = null;
	this.dataCanvas = null;
	this.dataContext = null;
	
	// Width, Height, and Graph Padding (in pixels)
	this.width = 640;
	this.height = 360;
	this.padding = 54;
	
	// The data we will be plotting (should be a 2d array of floats)
	this.data = new Array();
	this.dataFile = "data2.txt";
	this.dataTime = 1;
	
	// These values in units (not pixels)
	this.lowestX = 0;
	this.lowestY = 2;
	this.highestX = 3100;
	this.highestY = 95000;
	this.xDividers = 10;
	this.yDividers = 10;
	
	// Color values
	this.color1 = "black";
	this.color2 = "purple";
	this.alphaHigh = 1.0;
	this.alphaLow = 0.1;
	
	this.clear = function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.width);
	};
	
	/*
	 * drawAxes()
	 * 
	 * Draw the x & y axes.
	 */
	this.drawAxes = function()
	{
		var x = 0;
		var y = 0;
		var text = "";
		
		this.context.fillStyle = this.color1;
		this.context.strokeStyle = this.color1;
		this.context.font = "bold 7pt sans-serif";
		this.context.lineWidth = 1;

		// Add x-axis dividers
		for(var i = 0; i <= this.xDividers; i++)
		{
			x = ((this.width-this.padding*2)/this.xDividers*i+this.padding);
			text = this.lowestX+((this.highestX+Math.abs(this.lowestX))/this.xDividers*i);

			this.context.globalAlpha = this.alphaHigh;
			this.context.moveTo(x, (this.height-this.padding-5));
			this.context.lineTo(x, (this.height-this.padding+5));

			this.context.fillText(text, (x-(this.context.measureText(text).width/2)), (this.height-this.padding+20));
			
			this.context.globalAlpha = this.alphaLow;
			this.context.lineTo(x, this.padding);
		}

		// Add y-axis dividers
		for(i = 0; i <= this.yDividers; i++)
		{
			y = this.padding+(((this.height-this.padding*2)/this.yDividers)*(this.yDividers-i));
			text = parseInt(this.lowestY+((this.highestY+Math.abs(this.lowestY))/this.yDividers*i));

			this.context.globalAlpha = this.alphaHigh;
			this.context.moveTo((this.padding+5), y);
			this.context.lineTo((this.padding-5), y);

			this.context.fillText(text, (this.padding-this.context.measureText(text).width-10), (y+3));
			
			this.context.globalAlpha = this.alphaLow;
			this.context.lineTo((this.width-this.padding), y);
		}
		
		this.context.fill();
		this.context.stroke();
	};
	
	/*
	 * drawTitle()
	 * 
	 * Draw the graph's title.
	 */
	this.drawTitle = function()
	{
		var title = "Scatterplot #1";
		var titleX = this.context.measureText(title).width/2

		this.context.fillStyle = this.color1;
		this.context.font = "bold 12pt sans-serif";

		this.context.fillText(title, (this.width/2-titleX), (this.padding/2));
		
		this.context.fill();
		this.context.stroke();
	};
	
	/*
	 * drawBorder()
	 * 
	 * Draw the graph's border.
	 */
	this.drawBorder = function()
	{
		this.context.strokeStyle = this.color1;
		this.context.fillStyle = this.color1;
		this.context.lineWidth = 2;
		
		this.context.strokeRect((this.padding), (this.padding), (this.width-(this.padding*2)), (this.height-(this.padding*2)));
		
		this.context.fill();
		this.context.stroke();
	};
	
	/*
	 * plotDataPoints()
	 * 
	 * For each data point, plot its value on the graph.
	 */
	this.plotDataPoints = function()
	{
		var x = 0.0;
		var y = 0.0;
		
		this.dataContext.strokeStyle = this.color2;
		this.dataContext.fillStyle = this.color2;
		this.dataContext.lineWidth = 1;
		
		var start = new Date();
		
		// Read all the data points and draw them
		for(var i = 5; i < 6; i++)
		{
			x = this.width - (this.padding * 2);
			//x = x / (this.highestX + Math.abs(this.lowestX))
			x = x / this.highestX;
			//x = x * this.data[i][0];
			x = x * 30.0;
			x = x + this.padding*2;
			y = (this.height-this.padding) - ((this.height-this.padding*2)/this.highestY)*this.data[i][1];
			
			this.dataContext.moveTo(x, y);
			this.dataContext.arc(x, y, 2, 0, (2*Math.PI), false);
			
			document.getElementById("pointValues").innerHTML = "x: " + this.data[i][0] + "<br />";
			document.getElementById("pointValues").innerHTML += "y: " + this.data[i][1] + "<br /><br />";
			document.getElementById("pointValues").innerHTML += "X: " + x + "<br />";
			document.getElementById("pointValues").innerHTML += "Y: " + y;
		}
		
		// Fill in the data points
		this.dataContext.fill();
		this.dataContext.stroke();
		
		var end = new Date();
		
		document.getElementById("dataGraphed").innerHTML = "Graphed in " + (end.getTime()-start.getTime())/1000 + " seconds";
	};
	
	/*
	 * draw()
	 * 
	 * After drawing the title & axes, draw the border, then plot the data points.
	 * This method can be used as a "redraw" function (this can be called after
	 * graph metrics changed; and we don't need to reaquire data).
	 */
	this.draw = function()
	{
		this.clear();
		this.drawBorder();
		//this.drawTitle();
		this.drawAxes();
		this.plotDataPoints();
	};
	
	this.prepareScatterData = function()
	{
		var points = new Array();
		var point = 0.0;
		var highestX = 0.0;
		var highestY = 0.0;
		var lowestX = 0.0;
		var lowestY = 2;
		
		points = document.getElementById("data").innerHTML.split(",");
		lowestX = parseFloat(points[3]);
		highestY = points.length-6;
		
		// Make sure we clear the existing data!
		this.data = new Array();
		
		for(var i = 6; i < points.length; i++)
		{
			point = parseFloat(points[i]); // we need to convert the String to a float!
			this.data.push([point, (lowestY+i-6)]);
			if(point > highestX) // find the highest X value
				highestX = point;
			if(point < lowestX) // find the lowest X value
				lowestX = point;
		}
		
		// Find our highest values and add ~5% to them (for padding)
		this.highestX = parseInt(highestX+(highestX+Math.abs(lowestX))*0.05);
		//this.highestY = parseInt(highestY+highestY*0.05+1);
		this.highestY = parseInt(highestY+(highestY+Math.abs(lowestY))*0.05);
		// Here we want to make sure they're multiples of 5
		while(this.highestX % 5 != 0) this.highestX++;
		while(this.highestY % 5 != 0) this.highestY++;
		
		// Find our lowest values and add ~5% to them (for padding)
		this.lowestX = parseInt(lowestX-(highestX+Math.abs(lowestX))*0.05);
		this.lowestY = parseInt(lowestY-(highestY+Math.abs(lowestY))*0.05);
		// Here we want to make sure they're multiples of 5
		while(this.lowestX % 5 != 0) this.lowestX--;
		while(this.lowestY % 5 != 0) this.lowestY--;
		
		document.getElementById("dataMetrics").innerHTML = "Lowest Y: " + lowestY + " (" + this.lowestY + ")<br />";
		document.getElementById("dataMetrics").innerHTML += "Highest Y: " + highestY + " (" + this.highestY + ")<br /><br />";
		document.getElementById("dataMetrics").innerHTML += "Lowest X: " + lowestX + " (" + this.lowestX + ")<br />";
		document.getElementById("dataMetrics").innerHTML += "Highest X: " + highestX + " (" + this.highestX + ")";
		
		// Remove the temporarily stored data
		document.getElementById("data").innerHTML = "";
	};
	
	/*
	 * prepareData()
	 * 
	 * Take in the unparsed data, and split it into an array.
	 */
	this.prepareData = function()
	{
		var points = document.getElementById("data").innerHTML.split("+");
		var point = points[1].split(",");
		var highestX = 0.0;
		var highestY = 0.0;
		var lowestX = parseFloat(point[0]);
		var lowestY = parseFloat(point[1]);
		var x = point[0]; // The location of our X-value
		var y = point[1]; // The location of our Y-value
		
		// Make sure we clear the existing data!
		this.data = new Array();
		
		// We start at 2, because we have to allow for header data
		for(var i = 2; i < points.length; i++)
		{
			point = points[i].split(",");
			this.data.push([parseFloat(point[x]), parseFloat(point[y])]);
			if(point[x] > parseFloat(highestX)) // find the highest X value
				highestX = parseFloat(point[x]);
			if(point[y] > parseFloat(highestY)) // find the highest Y value
				highestY = parseFloat(point[y]);
		}
		
		this.highestX = parseInt(highestX+highestX*0.05);
		this.highestY = parseInt(highestY+highestY*0.05);
		
		// Remove the temporarily stored data
		document.getElementById("data").innerHTML = "";
	};
	
	/*
	 * getData()
	 * 
	 * Retrieve the data that needs to be graphed.
	 */
	this.getData = function()
	{
		if(window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new ActiveXObject("Microsoft.XMLHttp");
		
		document.getElementById("dataLoaded").innerHTML = "";
		document.getElementById("dataGraphed").innerHTML = "";

		xmlhttp.onreadystatechange = function()
		{
			if(xmlhttp.readyState == 4)
			{
				document.getElementById("data").innerHTML = xmlhttp.responseText;
			}
		};

		xmlhttp.open("POST", "php/getData.php", false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("dataFile="+this.dataFile+"&time="+this.dataTime);
	};
	
	this.doScatter = function(time)
	{
		var start;
		var end;
		
		this.dataTime = time;
		
		start = new Date();
		this.getData();
		end = new Date();
		
		this.prepareScatterData();
		
		document.getElementById("dataTime").innerHTML = "<b>" + this.data.length + "</b> data entries read";
		document.getElementById("dataLoaded").innerHTML = "Loaded in " + (end.getTime()-start.getTime())/100 + " seconds";
	};
	
	this.doNormal = function()
	{
		var start = new Date();
		
		this.getData();
		
		var end = new Date();
		
		this.prepareData();
		
		document.getElementById("dataTime").innerHTML = "<b>" + this.data.length + "</b> data entries read";
		document.getElementById("dataLoaded").innerHTML = "Loaded in " + (end.getTime()-start.getTime())/100 + " seconds";
	};
	
	/*
	 * init()
	 * 
	 * Initialize properties & attributes relating to the canvas.
	 */
	this.init = function(dataFile)
	{
		this.canvas = document.getElementById(this.elementId1);
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext("2d");
		
		this.dataCanvas = document.getElementById(this.elementId2);
		this.dataCanvas.width = this.width;
		this.dataCanvas.height = this.height;
		this.dataContext = this.dataCanvas.getContext("2d");
		
		this.dataFile = dataFile;
	};
}
