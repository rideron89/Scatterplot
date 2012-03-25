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
		<script src="javascript/p11Small.js"></script>
		<script src="javascript/scat.js"></script>
		<script src="javascript/pres.js"></script>
		<script src="javascript/temp.js"></script>
		<!--<script src="javascript/scatter.js"></script>-->
		<script>
			var time = 0;
			
			function init()
			{
				readTimes();
				
				// set the time variable to the default value of the select box
				time = document.getElementById("timeSelect").value;
				
				// set the range's current text to the select box's current time
				document.getElementById("rangeCurrent").innerHTML =
					document.getElementById("timeSelect").options[time].text;
				
				// set the range's number of selections to the number of times
				document.getElementById("timeRange").max =
					document.getElementById("timeSelect").length - 1;
				
				// Read data containing just the SCAT data
				readScatData();

				// Read data containing just the PRES data
				readPresData();
				
				readTempData();
				
				TEST();
				
				drawScat();

				drawPres();
				
				drawTemp();
			}
			
			function run()
			{
				TEST();
			}
			
			function updateRange()
			{
				time = document.getElementById("timeRange").value;
				
				document.getElementById("rangeCurrent").innerHTML =
					document.getElementById("timeSelect").options[time].text;
				
				document.getElementById("timeSelect").value = time;
				
				run();
			}
			
			function updateSelect()
			{
				time = document.getElementById("timeSelect").value;
				
				document.getElementById("rangeCurrent").innerHTML =
					document.getElementById("timeSelect").options[time].text;
				
				document.getElementById("timeRange").value = time;
				
				run();
			}
			
			/*
			 * decrement()
			 * 
			 * Decrement the Time range's value by it's 'step'.
			 */
			function decrement()
			{
				var range = document.getElementById("timeRange");
				
				if(range.value > range.min)
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
				
				if(range.value < range.max)
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
					<input id="timeMinus" type="button" value="-"
						onclick="decrement()" />
					<input id="timeRange" type="range" min="0" max="0" step="1"
						value="0" onchange="updateRange()" />
					<input id="timePlus" type="button" value="+"
						onclick="increment()" />
				</div>
				
				<div id="timeSliderPosition">
					<span id="rangeCurrent">64665</span> sec
				</div>
				
				<br />
				
				<div id="timeSelectDiv">
					Mid time (UTC): 
					<select id="timeSelect" onchange="updateSelect()">
					</select> 
					sec
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
			
			<div id="p11SmallCanvasDiv">
				<div id="p11SmallCanvasTitle" class="canvasTitle"></div>
				<div id="p11SmallYAxisTitle" class="yAxisTitle"></div>
				<div id="p11SmallXAxisTitle" class="xAxisTitle"></div>
				<canvas id="p11SmallGraph" class="graph"></canvas>
				<canvas id="p11SmallDataPoints" class="dataPoints"></canvas>
			</div>
			
			<div id="scatCanvasDiv">
				<div id="scatCanvasTitle" class="canvasTitle"></div>
				<div id="scatYAxisTitle" class="yAxisTitle"></div>
				<div id="scatXAxisTitle" class="xAxisTitle"></div>
				<canvas id="scatGraph" class="graph"></canvas>
				<canvas id="scatDataPoints" class="dataPoints"></canvas>
			</div>
			
			<div id="presCanvasDiv">
				<div id="presCanvasTitle" class="canvasTitle"></div>
				<div id="presYAxisTitle" class="yAxisTitle"></div>
				<div id="presXAxisTitle" class="xAxisTitle"></div>
				<canvas id="presGraph" class="graph"></canvas>
				<canvas id="presDataPoints" class="dataPoints"></canvas>
			</div>
			
			<div id="tempCanvasDiv">
				<div id="tempCanvasTitle" class="canvasTitle"></div>
				<div id="tempYAxisTitle" class="yAxisTitle"></div>
				<div id="tempXAxisTitle" class="xAxisTitle"></div>
				<canvas id="tempGraph" class="graph"></canvas>
				<canvas id="tempDataPoints" class="dataPoints"></canvas>
			</div>
		</div> <!-- canvasBox -->
			
		<div id="bottomPane">
			<div id="p11Data" style="display: none; visibility: hidden;">
			</div>
			<div id="coefficientData"
				style="display: none; visibility: hidden;"></div>
			<div id="scatData" style="display: none; visibility: hidden;">
			</div>
			<div id="presData" style="display: none; visibility: hidden;">
			</div>
			<div id="tempData" style="display: none; visibility: hidden;">
			</div>
		</div>
	</body>
</html>
