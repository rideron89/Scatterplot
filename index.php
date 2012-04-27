<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>
			UMBC Pi-Neph Data
		</title>
		<link href="./style/scatter.css" rel="stylesheet" type="text/css" />
		<script src="javascript/jquery172.js"></script>
		<script src="javascript/jqueryui/jqueryui1819.js"></script>
		<script src="javascript/utils.js"></script>
		<script src="javascript/main.js"></script>
		<script src="javascript/p11.js"></script>
		<script src="javascript/p11Small.js"></script>
		<script src="javascript/p12.js"></script>
		<script src="javascript/R07Flight.js"></script>
		<script src="javascript/alt.js"></script>
		<script src="javascript/scat.js"></script>
		<script src="javascript/pres.js"></script>
		<script src="javascript/temp.js"></script>
		<script src="javascript/rh.js"></script>
		<script src="javascript/total550.js"></script>
		<script src="javascript/piVsTsi.js"></script>
		<script>
			var time = 0;
			
			function updateRange()
			{
				time = document.getElementById("timeRange").value;
				
				document.getElementById("rangeCurrent").innerHTML =
					document.getElementById("timeSelect").options[time].text;
				
				document.getElementById("timeSelect").value = time;
				
				updateGraphs();
			}
			
			function updateSelect()
			{
				time = document.getElementById("timeSelect").value;
				
				document.getElementById("rangeCurrent").innerHTML =
					document.getElementById("timeSelect").options[time].text;
				
				document.getElementById("timeRange").value = time;
				
				updateGraphs();
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
			
			$(document).ready(function()
			{
				$("#loadingIconDiv").slideDown(400);
				$("#tocItems").hide();
				$(".canvasDiv").hide();
				
				readTimes();
			});
			
			$(document).ajaxStop(function()
			{
				$("#loadingIconDiv").slideUp(400);
			});
			
			function toggleToc()
			{
				$("#tocItems").toggle("blind");
			}
		</script>
	</head>
	<body>
	
		<div id="outerBox">
			<div style="width: 100%; text-align: center; color: #333333;
				font-size: 8pt; font-style: italic;"
				title="">
				Optimized for Google Chrome
			</div>
			
			<br />
			
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
			
			<div id="loadingIconDiv">
				<img src="style/loadingIcon.gif" /><br />
				Data is loading...
			</div>
			
			<div id="dataInformationBox">
				Start UTC: <span id="startUTC"></span> sec<br />
				End UTC: <span id="endUTC"></span> sec<br />
				HH:MM:SS UTC: <span id="calendar"></span><br />
				SCAT: <span id="scat"></span> 1/Mm<br />
				PRES: <span id="pres"></span> Pa<br />
				TEMP: <span id="temp"></span> K<br />
				RH1 (inlet): <span id="rh1"></span>%<br />
				RH2 (chamber): <span id="rh2"></span>%<br />
				RH3 (outlet): <span id="rh3"></span>%<br />
				Plane Latitude: <span id="lat"></span><br />
				Plane Longitude: <span id="lon"></span><br />
				GPS Altitude: <span id="alt"></span> feet
			</div>
			
			<div id="performanceInfo">
			</div>
			
			<div id="p11PerformanceInfo">
			</div>
			
			<div id="errorInfoDiv">
			</div>
			
			<div id="warningInfoDiv">
			</div>
		</div> <!-- outerBox -->
		
		<div id="tocBox">
			<div id="tocLabel" onclick="toggleToc()">
				<button id="tocButton">
					Table of Contents
				</button>
			</div>
			
			<div id="tocItems">
				<button class="tocItem">
					P11, aerosol only phase function
				</button><br />
				<button class="tocItem">
					P11, aerosol only phase function (small)
				</button><br />
				<button class="tocItem">
					-P12/P11, aerosol only degree of linear polarization
				</button><br />
				<button class="tocItem">
					Linear Scattering Coefficient
				</button><br />
				<button class="tocItem">
					Graph of Flight Path
				</button><br />
				<button class="tocItem">
					GPS Altitude
				</button><br />
				<button class="tocItem">
					Pressure Inside PI-Neph Chamber
				</button><br />
				<button class="tocItem">
					Temperature Inside PI-Neph Chamber
				</button><br />
				<button class="tocItem">
					Relative Humidity
				</button><br />
				<button class="tocItem">
					Linear Scattering Coefficient (at 550nm)
				</button>
			</div>
		</div> <!-- tocBox -->
		
		<div id="canvasBox">
			<div id="p11CanvasDiv" class="canvasDiv">
				<div id="p11CanvasTitle" class="canvasTitle"></div>
				<div id="p11YAxisTitle" class="yAxisTitle"></div>
				<div id="p11XAxisTitle" class="xAxisTitle"></div>
				<canvas id="p11Graph" class="graph"></canvas>
				<canvas id="p11DataPoints" class="dataPoints"></canvas>
			</div>
			
			<div id="p11SmallCanvasDiv" class="canvasDiv">
				<div id="p11SmallCanvasTitle" class="canvasTitle"></div>
				<div id="p11SmallYAxisTitle" class="yAxisTitle"></div>
				<div id="p11SmallXAxisTitle" class="xAxisTitle"></div>
				<canvas id="p11SmallGraph" class="graph"></canvas>
				<canvas id="p11SmallDataPoints" class="dataPoints"></canvas>
			</div>
			
			<div id="p12CanvasDiv" class="canvasDiv">
				<div id="p12CanvasTitle" class="canvasTitle"></div>
				<div id="p12YAxisTitle" class="yAxisTitle"></div>
				<div id="p12XAxisTitle" class="xAxisTitle"></div>
				<canvas id="p12Graph" class="graph"></canvas>
				<canvas id="p12DataPoints" class="dataPoints"></canvas>
			</div>
			
			<div id="scatCanvasDiv" class="canvasDiv">
				<div id="scatCanvasTitle" class="canvasTitle"></div>
				<div id="scatYAxisTitle" class="yAxisTitle"></div>
				<div id="scatXAxisTitle" class="xAxisTitle"></div>
				<canvas id="scatGraph" class="graph"></canvas>
				<canvas id="scatDataPoints" class="dataPoints"></canvas>
				<canvas id="scatTimeLine" class="timeLine"></canvas>
			</div>
			
			<div id="mapCanvasDiv" class="canvasDiv">
				<div id="mapTitle"></div>
				<div id="mapCanvas"></div>
			</div>
			
			<div id="altCanvasDiv" class="canvasDiv">
				<div id="altCanvasTitle" class="canvasTitle"></div>
				<div id="altYAxisTitle" class="yAxisTitle"></div>
				<div id="altXAxisTitle" class="xAxisTitle"></div>
				<canvas id="altGraph" class="graph"></canvas>
				<canvas id="altDataPoints" class="dataPoints"></canvas>
				<canvas id="altTimeLine" class="timeLine"></canvas>
			</div>
			
			<div id="presCanvasDiv" class="canvasDiv">
				<div id="presCanvasTitle" class="canvasTitle"></div>
				<div id="presYAxisTitle" class="yAxisTitle"></div>
				<div id="presXAxisTitle" class="xAxisTitle"></div>
				<canvas id="presGraph" class="graph"></canvas>
				<canvas id="presDataPoints" class="dataPoints"></canvas>
				<canvas id="presTimeLine" class="timeLine"></canvas>
			</div>
			
			<div id="tempCanvasDiv" class="canvasDiv">
				<div id="tempCanvasTitle" class="canvasTitle"></div>
				<div id="tempYAxisTitle" class="yAxisTitle"></div>
				<div id="tempXAxisTitle" class="xAxisTitle"></div>
				<canvas id="tempGraph" class="graph"></canvas>
				<canvas id="tempDataPoints" class="dataPoints"></canvas>
				<canvas id="tempTimeLine" class="timeLine"></canvas>
			</div>
			
			<div id="rhCanvasDiv" class="canvasDiv">
				<div id="rhCanvasTitle" class="canvasTitle"></div>
				<div id="rhYAxisTitle" class="yAxisTitle"></div>
				<div id="rhXAxisTitle" class="xAxisTitle"></div>
				<canvas id="rhGraph" class="graph"></canvas>
				<canvas id="rh1DataPoints" class="dataPoints"></canvas>
				<canvas id="rh2DataPoints" class="dataPoints"></canvas>
				<canvas id="rh3DataPoints" class="dataPoints"></canvas>
				<canvas id="rhTimeLine" class="timeLine"></canvas>
				<canvas id="rhLegend" class="legend"></canvas>
			</div>
			
			<div id="tot550CanvasDiv" class="canvasDiv">
				<div id="tot550CanvasTitle" class="canvasTitle"></div>
				<div id="tot550YAxisTitle" class="yAxisTitle"></div>
				<div id="tot550XAxisTitle" class="xAxisTitle"></div>
				<canvas id="tot550Graph" class="graph"></canvas>
				<canvas id="tot550DataPoints" class="dataPoints"></canvas>
				<canvas id="tot550TimeLine" class="timeLine"></canvas>
			</div>
			
			<div id="piVsTsiCanvasDiv" class="canvasDiv">
				<div id="piVsTsiCanvasTitle" class="canvasTitle"></div>
				<div id="piVsTsiYAxisTitle" class="yAxisTitle"></div>
				<div id="piVsTsiXAxisTitle" class="xAxisTitle"></div>
				<canvas id="piVsTsiGraph" class="graph"></canvas>
				<canvas id="piVsTsiDataPoints" class="dataPoints"></canvas>
				<canvas id="piVsTsiTimeLine" class="timeLine"></canvas>
			</div>
		</div> <!-- canvasBox -->
	</body>
</html>
