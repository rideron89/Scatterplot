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
function saveTimes(output)
{
	if(output[0] == "!")
	{
		errorMessage(mysqlError(output.substr(1)));
		return;
	}
	
	var times = output.split(",");

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
	graphTotal550();
	graphPiVsTsi();
	graphPiAndTsi();
	
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
	moveTot550TimeLine();
	
	movePlaneMarker();
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
	
	var lat = data[0] + "&#176; " + data[1] + "&#39; "
		+ parseFloat(data[2]).toFixed(1) + "&#34;";
	var lon = data[3] + "&#176; " + data[4] + "&#39; "
		+ parseFloat(data[5]).toFixed(1) + "&#34;";
	
	document.getElementById("lat").innerHTML = lat;
	document.getElementById("lon").innerHTML = lon;
	document.getElementById("alt").innerHTML = data[6];
}
