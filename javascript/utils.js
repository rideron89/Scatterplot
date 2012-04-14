function secondsToCalendar(seconds)
{
	var string = "";
	var hh, mm, ss;
	
	hh = parseInt(seconds/60/60, 10) % 24;
	mm = parseInt(seconds/60, 10) % 60;
	ss = seconds % 60;
	
	if(hh < 10)
		hh = "0" + hh;
	
	if(mm < 10)
		mm = "0" + mm;
	
	if(ss < 10)
		ss = "0" + ss;
	
	string = hh + ":" + mm + ":" + ss;
	
	return string;
}

function secondsToCalendarHHMM(seconds)
{
	var string = secondsToCalendar(seconds);
	
	string = string.substr(0, 5);
	
	return string;
}

function errorMessage(message)
{
	document.getElementById("errorInfoDiv").innerHTML += message + "<br />";
}

function warningMessage(message)
{
	document.getElementById("warningInfoDiv").innerHTML += message + "<br />";
}