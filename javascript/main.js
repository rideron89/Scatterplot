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
				select.options[select.options.length] = new Option(times[i], times[i]);
		}
	};

	xmlhttp.open("POST", "php/getTimes.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("dataFile=scat.txt");
}

function readScatData()
{
	var time = document.getElementById("timeSelect").value;
	
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

	xmlhttp.open("POST", "php/getData.php", false);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("dataFile=scat.txt"+"&time="+time);
}

function readCoefficientData()
{
	var time = document.getElementById("timeSelect").value;
	
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
	xmlhttp.send("dataFile=coefficient.txt"+"&time="+time);
}

function updateInformation()
{
	var startUTC, endUTC, calendar, scat, pres, temp, rh1, rh2, rh3;
	var scatData = document.getElementById("scatData").innerHTML.split(",");
	var coefficientData = document.getElementById("coefficientData").innerHTML.split(",");
	
	startUTC = scatData[0];
	endUTC = scatData[1];
	calendar = secondsToCalendar(scatData[2]);
	scat = coefficientData[6];
	pres = coefficientData[7];
	temp = coefficientData[11];
	rh1 = coefficientData[8];
	rh2 = coefficientData[9];
	rh3 = coefficientData[10];
	
	document.getElementById("startUTC").innerHTML = startUTC;
	document.getElementById("endUTC").innerHTML = endUTC;
	document.getElementById("calendar").innerHTML = calendar;
	document.getElementById("scat").innerHTML = scat;
	document.getElementById("pres").innerHTML = pres;
	document.getElementById("temp").innerHTML = temp;
	document.getElementById("rh1").innerHTML = rh1;
	document.getElementById("rh2").innerHTML = rh2;
	document.getElementById("rh3").innerHTML = rh3;
}

function TEST()
{
	var start, end;
	
	// Get/Read all times
	start = new Date();
	readTimes();
	end = new Date();
	document.getElementById("performanceInfo").innerHTML = "Read Times: " + (end.getTime()-start.getTime())/100 + " seconds<br />";
	
	// Find requested time
	
	// Read data from the scattering data file
	start = new Date();
	readScatData();
	end = new Date();
	document.getElementById("performanceInfo").innerHTML += "Read Scat: " + (end.getTime()-start.getTime())/100 + " seconds<br />";
	
	// Read data from the scattering coefficient data file
	start = new Date();
	readCoefficientData();
	end = new Date();
	document.getElementById("performanceInfo").innerHTML += "Read Coefficient: " + (end.getTime()-start.getTime())/100 + " seconds<br />";
	
	// Update information posted on page
	start = new Date();
	updateInformation();
	end = new Date();
	document.getElementById("performanceInfo").innerHTML += "Update Information: " + (end.getTime()-start.getTime())/100 + " seconds<br />";
	
	// Construct P11 Phase Function graph
}
