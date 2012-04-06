/*
 * readTimes()
 *
 * Retrieve all times recorded in the data. Then place them into the range element.
 */
function readTimes()
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
				select.options[select.options.length] = new Option(times[i], i);
		}
	};

	xmlhttp.open("POST", "php/getTimes.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("dataFile=scat.txt");
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
	//calendar = scatData[3] + ":" + scatData[4] + ":" + scatData[5];
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
	drawP11();
	
	// Construct the smaller P11 Phase Function graphs
	drawP11Small();
}
