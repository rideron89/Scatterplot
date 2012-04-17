function updateGraphs()
{
	var select = document.getElementById("timeSelect");
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getCoefficientData.php",
		success: showCoefficientData,
		data: {time: select.options[time].text},
		dataType: "text"
	});
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getLocationData.php",
		success: showLocationData,
		data: {time: select.options[time].text},
		dataType: "text"
	});
	
	graphP11();
	graphP11Small();
	
	moveScatTimeLine();
	moveAltTimeLine();
	movePresTimeLine();
	moveTempTimeLine();
	moveRHTimeLine();
}

/*
 * readTimes()
 * 
 * Get all the time values.
 */
function readTimes()
{
	$.ajax({
		type: "POST",
		url: "php/scripts/getTimes.php",
		success: saveTimes,
		dataType: "text"
	});
}

/*
 * saveTimes()
 * 
 * Receive the time values and store them.
 */
function saveTimes(times)
{
	var times = times.split(",");

	var select = document.getElementById("timeSelect");

	for(var i = 0; i < times.length-1; i++)
		select.options[select.options.length] =
			new Option(times[i], i);

	// set the time variable to the default value of the select box
	time = document.getElementById("timeSelect").value;

	// set the range's current text to the select box's current time
	document.getElementById("rangeCurrent").innerHTML =
		document.getElementById("timeSelect").options[time].text;

	// set the range's number of selections to the number of times
	document.getElementById("timeRange").max =
		document.getElementById("timeSelect").length - 1;

	graphP11();
	graphP11Small();
	graphP12();
	graphScat();
	buildMap();
	graphAlt();
	graphPres();
	graphTemp();
	graphRH();
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getCoefficientData.php",
		success: showCoefficientData,
		data: {time: select.options[time].text},
		dataType: "text"
	});
	
	$.ajax({
		type: "POST",
		url: "php/scripts/getLocationData.php",
		success: showLocationData,
		data: {time: select.options[time].text},
		dataType: "text"
	});
}

function showCoefficientData(output)
{
	var data = output.split(",");
	
	var calendar = secondsToCalendar(data[2]);
	
	document.getElementById("startUTC").innerHTML = data[0];
	document.getElementById("endUTC").innerHTML = data[1];
	document.getElementById("calendar").innerHTML = calendar;
	document.getElementById("scat").innerHTML = data[6];
	document.getElementById("pres").innerHTML = data[7];
	document.getElementById("rh1").innerHTML = data[8];
	document.getElementById("rh2").innerHTML = data[9];
	document.getElementById("rh3").innerHTML = data[10];
	document.getElementById("temp").innerHTML = data[11];
}

function showLocationData(output)
{
	var data = output.split(",");
	
	var lat = data[0] + "&#176;" + data[1] + "&#39;" + data[2] + "&#34;";
	var lon = data[3] + "&#176;" + data[4] + "&#39;" + data[5] + "&#34;";
	
	document.getElementById("lat").innerHTML = lat;
	document.getElementById("lon").innerHTML = lon;
	document.getElementById("alt").innerHTML = data[6];
}

function readP11Data()
{
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			document.getElementById("p11Data").innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.open("POST", "php/getData.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("dataFile=scat.txt"+"&time="+time); // the variable "time" is initialized in index.php
}

function readCoefficientData()
{
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			document.getElementById("coefficientData").innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.open("POST", "php/getData.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("dataFile=coefficient.txt"+"&time="+time); // the variable "time" is initialized in index.php
}

function readLocationData()
{
	var times = document.getElementById("timeSelect").options;
	
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			document.getElementById("locationData").innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.open("POST", "php/getLoc.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("time="+times[time].text); // the variable "time" is initialized in index.php
}

function readScatData()
{
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			document.getElementById("scatData").innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.open("POST", "php/getScat.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

function readPresData()
{
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			document.getElementById("presData").innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.open("POST", "php/getPres.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

function readTempData()
{
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			document.getElementById("tempData").innerHTML = xmlhttp.responseText;
		}
	};

	xmlhttp.open("POST", "php/getTemp.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

function readRHData()
{
	var i = 1;
	
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			document.getElementById("rh" + i + "Data").innerHTML =
				xmlhttp.responseText;
		}
	};

	for(i = 1; i <= 3; i++)
	{
		xmlhttp.open("POST", "php/getRH.php", false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("index=" + i);
	}
}

function readAltData()
{
	var i = 1;
	
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHttp");

	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4)
		{
			
			document.getElementById("altData").innerHTML =
				xmlhttp.responseText;
		}
	};

	for(i = 1; i <= 3; i++)
	{
		xmlhttp.open("POST", "php/getAlt.php", false);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send();
	}
}

function updateInformation()
{
	var startUTC, endUTC, calendar;
	var scat, pres, temp, rh1, rh2, rh3;
	var lat, lon, alt;
	var scatData = document.getElementById("p11Data").innerHTML.split(",");
	var coefficientData = document.getElementById("coefficientData").innerHTML.split(",");
	var locData = document.getElementById("locationData").innerHTML.split(",");
	
	startUTC = scatData[0];
	endUTC = scatData[1];
	calendar = secondsToCalendar(scatData[2]);
	scat = coefficientData[6];
	pres = coefficientData[7];
	temp = coefficientData[11];
	rh1 = coefficientData[8];
	rh2 = coefficientData[9];
	rh3 = coefficientData[10];
	lat = locData[1] + "&#176;" + locData[2] + "&#39;" + locData[3] + "&#34;";
	lon = locData[4] + "&#176;" + locData[5] + "&#39;" + locData[6] + "&#34;";
	alt = locData[7];
	
	document.getElementById("startUTC").innerHTML = startUTC;
	document.getElementById("endUTC").innerHTML = endUTC;
	document.getElementById("calendar").innerHTML = calendar;
	document.getElementById("scat").innerHTML = scat;
	document.getElementById("pres").innerHTML = pres;
	document.getElementById("temp").innerHTML = temp;
	document.getElementById("rh1").innerHTML = rh1;
	document.getElementById("rh2").innerHTML = rh2;
	document.getElementById("rh3").innerHTML = rh3;
	document.getElementById("lat").innerHTML = lat;
	document.getElementById("lon").innerHTML = lon;
	document.getElementById("alt").innerHTML = alt;
}

function TEST()
{
	// Read data from the scattering data file
	readP11Data();
	
	// Read data from the scattering coefficient data file
	readCoefficientData();
	
	// Read data from the location data file
	readLocationData();

	// Update information posted on page
	updateInformation();
	
	// Construct P11 Phase Function graph
	//drawP11();
	
	// Construct the smaller P11 Phase Function graphs
	drawP11Small();
	
	// Construct the P12 Phase Function graph
	drawP12();
}
