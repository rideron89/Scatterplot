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
	this.yDividersNegative = 0;
	
	// Color values
	this.color1 = "black";
	this.color2 = "red";
	this.alphaHigh = 1.0;
	this.alphaLow = 0.2;
	
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
		var lowY = 0;
		
		this.context.fillStyle = this.color1;
		this.context.strokeStyle = this.color1;
		this.context.font = "bold 7pt sans-serif";
		this.context.lineWidth = 1;
		
		// Add x-axis dividers
		for(var i = 0; i <= this.xDividers; i++)
		{
			x = this.width - (this.padding * 2); // find the width of just the graph space
			x = x / this.xDividers * i; // find the pixel-count of a divider
			x = x + this.padding; // add initial (left) padding to the X value
			
			text = this.highestX + Math.abs(this.lowestX);
			text = text / this.xDividers * i;
			text = parseInt(this.lowestX + text);
			
			// Place the X value next to it's divider
			this.context.globalAlpha = this.alphaHigh;
			this.context.fillText(text, (x-this.context.measureText(text).width/2), (this.height-this.padding+20));
			
			// Place transparent gridlines
			this.context.globalAlpha = this.alphaLow;
			this.context.moveTo(x, (this.height-this.padding+5));
			this.context.lineTo(x, this.padding);
		}
		
		for(var j = 0; lowY < Math.abs(this.lowestY); j++)
		{
			lowY = Math.pow(10, j-1);
		}
		
		this.yDividersNegative = j;
		
		// Find the lowest Y value (but don't go above 0)
		if(this.lowestY <= 0)
			lowY *= -1;
		else
			lowY = 0;
		
		// Add the positive y-axis dividers
		for(i = 0; i <= this.yDividers; i++)
		{
			y = this.height - (this.padding * 2); // find the height of just the graph space
			y = y / (this.yDividers + j) * i; // find the pixel-count of the divider
			y = y + this.padding; // add initial (top) padding to the Y value
			
			// Because 0 is at the top-left, we must start from the highest Y
			if(i == this.yDividers)
				text = 0;
			else
				text = Math.pow(10, (this.yDividers-i-2));
			
			// Place the Y value next to it's divider
			this.context.globalAlpha = this.alphaHigh;
			this.context.fillText(text, (this.padding-this.context.measureText(text).width-10), (y+3));
			
			// Place transparent gridlines
			this.context.globalAlpha = this.alphaLow;
			this.context.moveTo((this.padding-5), y);
			this.context.lineTo((this.width-this.padding), y);
		}
		
		// Add the negative y-axis dividers
		for(i = 0; i < j; i++)
		{
			y = this.height - (this.padding * 2); // find the height of just the graph space
			y = y / (this.yDividers + j) * i; // find the pixel-count of the divider
			y = this.height - y - this.padding;
			
			text = -1 * Math.pow(10, (j-i-2));
			
			this.context.globalAlpha = this.alphaHigh
			this.context.fillText(text, (this.padding-this.context.measureText(text).width-10), (y+3));
			
			this.context.globalAlpha = this.alphaLow;
			this.context.moveTo((this.padding-5), y);
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
		var temp = 0.0;
		
		this.dataContext.strokeStyle = this.color2;
		this.dataContext.fillStyle = this.color2;
		this.dataContext.lineWidth = 1;
		
		var start = new Date();
		
		// Read all the data points and draw them
		//for(var i = 0; i < this.data.length; i++)
		for(var i = 0; i < this.data.length; i++)
		{
			/* Find the X-coordinate's location on the graph. */
			x = this.width - (this.padding * 2); // find the width of just the graph space
			x = x / (this.highestX - this.lowestX); // find the pixel-count of each coordinate
			x = x * (this.data[i][0] - this.lowestX) + this.padding; // locate the x-coordinate's location
			
			y = 0;
			
			// find the highest power of 10 our y-coordinate is greater than
			for(var j = 0; y < Math.abs(this.data[i][1]); j++)
				y = Math.pow(10, j);
			
			if(this.data[i][1] > 0)
			{
				y = this.height - (this.padding * 2); // find the height of just the graph space
				y = y / (this.yDividers + this.yDividersNegative) * (this.yDividers - j); // find the pixel-count of each each divider
				temp = this.height - (this.padding * 2);
				temp = temp / (this.yDividers + this.yDividersNegative) / 100;
				temp = temp * (this.data[i][1] / Math.pow(10, j-1) * 100);
				y = y - temp;
			}
			else if(this.data[i][1] == 0)
			{
				y = this.height - (this.padding * 2);
				y = y / (this.yDividers + this.yDividersNegative) * this.yDividers;
			}
			else
			{
				y = this.height - (this.padding * 2);
				y = y / (this.yDividers + this.yDividersNegative) * (this.yDividers + j);
				temp = this.height - (this.padding * 2);
				temp = temp / (this.yDividers + this.yDividersNegative) / 100;
				temp = temp * (Math.abs(this.data[i][1]) / Math.pow(10, j-1) * 100);
				y = y + temp;
			}
			
			y = y + this.padding;
			
			// draw a circle at (x, y)
			this.dataContext.moveTo(x, y);
			this.dataContext.arc(x, y, 2, 0, (2*Math.PI), false);
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
		var y = 0.0;
		var lowestX = 2; // As of now, our lowest X-value will be 2
		var highestX = 0.0;
		var lowestY = 0.0;
		var highestY = 0.0;
		
		points = document.getElementById("data").innerHTML.split(","); // break-up the y-values
		highestX = points.length-6; // make the highest X-value the number of actual values we have
		lowestY = parseFloat(points[6]); // pick the first number we find to be our lowest Y-value
		
		// Make sure we clear the existing data!
		this.data = new Array();
		
		/* Formulate the data points into an array. */
		for(var i = 6; i < points.length; i++)
		{
			y = parseFloat(points[i]); // we need to convert the String to a float!
			this.data.push([(lowestX+i-6), y]); // add the data points to the array
			
			if(y > highestY) // find the highest Y value
				highestY = y;
			if(y < lowestY) // find the lowest Y value
				lowestY = y;
		}
		
		// Initialize some low/high values
		this.highestY = lowestY;
		this.lowestY = 0;
		
		/* Find the highest log scale form of Y. */
		for(i = 0; this.highestY < highestY; i++)
		{
			this.highestY = Math.pow(10, i);
		}
		
		// We might have used (i-1), but we want to include the lowest (0.1)
		// We add one because we want to include 0
		this.yDividers = i+1;
		
		// Find the lowest log scale form of Y
		for(i = 0; this.lowestY > lowestY; i++)
		{
			this.lowestY = -1 * Math.pow(10, i);
		}
		
		// Find our highest values and add ~5% to them (for padding)
		this.highestX = parseInt(highestX+(highestY+Math.abs(lowestX))*0.05);
		// Here we want to make sure they're multiples of 5
		while(this.highestX % 5 != 0) this.highestX++;
		
		// Find our lowest values and add ~5% to them (for padding)
		this.lowestX = parseInt(lowestX-(highestX+Math.abs(lowestX))*0.05);
		// Here we want to make sure they're multiples of 5
		while(this.lowestX % 5 != 0) this.lowestX--;
		
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
	
	this.getTimes = function()
	{
		if(window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

		xmlhttp.onreadystatechange = function()
		{
			if(xmlhttp.readyState == 4)
			{
				var times = xmlhttp.responseText.split(",");
				
				var select = document.getElementById("timeSelect");
				
				for(var i = 0; i < times.length-1; i++)
					select.options[select.options.length] = new Option(times[i], times[i]);
			}
		};

		xmlhttp.open("POST", "php/getTimes.php", false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("dataFile="+this.dataFile);
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
		
		document.getElementById("dataTime").innerHTML = "<b>" + this.data.length + "</b> data points read";
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
