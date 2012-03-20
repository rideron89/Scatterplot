<!DOCTYPE html>
<html>
	<head>
		<title>
			Scatterplot
		</title>
		<link href="./style/scatter.css" rel="stylesheet" type="text/css" />
		<script src="javascript/utils.js"></script>
		<script src="javascript/main.js"></script>
		<script src="javascript/p11.js"></script>
		<script src="javascript/scatter.js"></script>
		<script>
			function init()
			{
				readTimes();
				
				TEST();
			}
			
			function run()
			{
				TEST();
			}
			
			function updateRange()
			{
				document.getElementById("rangeCurrent").innerHTML = document.getElementById("timeRange").value;
				
				run();
				document.getElementById("timeSelect").value = document.getElementById("scatData").innerHTML.split(",")[3];
			}
			
			function updateSelect()
			{
				document.getElementById("timeRange").value = document.getElementById("timeSelect").value;
				
				updateRange();
			}
			
			/*
			 * decrement()
			 * 
			 * Decrement the Time range's value by it's 'step'.
			 */
			function decrement()
			{
				var range = document.getElementById("timeRange");
				
				range.value = parseInt(range.value) - parseInt(range.step);
				
				updateRange();
			}
			
			/*
			 * increment()
			 * 
			 * Increment the Time range's value by it's 'step'.
			 */
			function increment()
			{
				var range = document.getElementById("timeRange");
				
				range.value = parseInt(range.value) + parseInt(range.step);
				
				updateRange();
			}
		</script>
	</head>
	<body onload="init()">
	
		<div id="outerBox">
			<div id="timeSelectionBox">
				<div id="timeSliderLabel">
					Graph Time (Seconds)
				</div>
				
				<div id="timeSlider">
					<input id="timeMinus" type="button" value="-" onclick="decrement()" />
					<input id="timeRange" type="range" min="64665" max="73901" step="30" value="0" onchange="updateRange()" />
					<input id="timePlus" type="button" value="+" onclick="increment()" />
				</div>
				
				<div id="timeSliderPosition">
					<span id="rangeCurrent">64665</span> sec
				</div>
				
				<br />
				
				<div id="timeSelectDiv">
					Mid time (UTC): <select id="timeSelect" onchange="updateSelect()"></select> sec
				</div>
				
			</div> <!-- timeSelectionBox -->
			
			<div id="dataInformationBox">
				Start UTC: <span id="startUTC"></span> sec<br />
				End UTC: <span id="endUTC"></span> sec<br />
				HH:MM:SS: <span id="calendar"></span><br />
				SCAT: <span id="scat"></span> 1/Mm<br />
				PRES: <span id="pres"></span> Pa<br />
				TEMP: <span id="temp"></span> K<br />
				RH1: <span id="rh1"></span>%<br />
				RH2: <span id="rh2"></span>%<br />
				RH3: <span id="rh3"></span>%
			</div>
			
			<div id="performanceInfo">
			</div>
			
			<div id="p11PerformanceInfo">
			</div>
		</div> <!-- outerBox -->
		
		<div id="canvasBox">
			<div id="p11CanvasDiv">
				<div id="p11CanvasTitle" class="canvasTitle"></div>
				<div id="p11YAxisTitle" class="yAxisTitle"></div>
				<div id="p11XAxisTitle" class="xAxisTitle"></div>
				<canvas id="p11Graph" class="graph"></canvas>
				<canvas id="p11DataPoints" class="dataPoints"></canvas>
			</div>
		</div> <!-- canvasBox -->
			
		<div id="bottomPane">
			<div id="scatData" style="display: none; visibility: hidden;"></div>
			<div id="coefficientData" style="display: none; visibility: hidden;"></div>
		</div>
	</body>
</html>
