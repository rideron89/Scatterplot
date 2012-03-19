function secondsToCalendar(seconds)
{
	var string = "";
	var hh, mm, ss;
	
	hh = parseInt(seconds/60/60) % 24;
	mm = parseInt(seconds/60) % 60;
	ss = seconds % 60;
	
	string = hh + ":" + mm + ":" + ss;
	
	return string;
}
