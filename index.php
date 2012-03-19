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
			var graph = new Scatterplot("p11Graph", "p11DataPoints");
			
			function run()
			{
				TEST();
				
				drawP11();
			}
			
			function init()
			{
				updateRange();
				graph.getTimes();
			}
			
			function go(time)
			{
				TEST();
				/*graph.init(document.getElementById("graphDataList").value);
				
				if(document.getElementById("graphDataList").value.indexOf("scat") != -1)
				{
					document.getElementById("canvasTitle").innerHTML = "Polarized Imaging Nephelometer";
					document.getElementById("xAxisTitle").innerHTML = "Scattering Angle [degrees]";
					document.getElementById("yAxisTitle").innerHTML = "Phase Function [unitless]";
					document.getElementById("rangeDiv").style.display = "block";
					graph.doScatter(time);
				}
				else
				{
					document.getElementById("canvasTitle").innerHTML = "Other Data Graph";
					document.getElementById("rangeDiv").style.display = "none";
					graph.doNormal();
				}
				
				graph.draw();*/
			}
			
			function updateRange()
			{
				go(document.getElementById("timeRange").value);
				document.getElementById("rangeCurrent").innerHTML = document.getElementById("timeRange").value;
			}
			
			function updateSelect()
			{
				go(document.getElementById("timeSelect").value);
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
	<body onload="/*init();*/run();">
	
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
					64665
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
		
		<div id="mainBox">
			<div id="midPane">
				<!-- Settings on left-hand side of screen -->
				<div id="leftSettings">
					<select id="graphDataList" class="ui-widget ui-widget-text" title="Please note redrawing the graph may take time." onchange="go()">
						<option value="scat.txt">Scat  Data</option>
						<option value="data.txt">Other Data</option>
					</select>
					<br /><br />
					<div id="rangeDiv" title="These times are less precise than below.">
						Graph Time (Seconds)<br />
						<input id="timeMinus" type="button" value="-" onclick="decrement()" />
						<input id="timeRange" type="range" min ="64665" max="73901" step="30" value="0" onchange="updateRange()" />
						<input id="timePlus" type="button" value="+" onclick="increment()" /><br />
						<span id="rangeCurrent"></span>
					</div>
					
					<br />
					
					<div id="timeSelectDiv" title="These times are more precise than above.">
						Start time (UTC):
						<select id="timeSelect" onchange="updateSelect()">
						</select>
					</div>
					
					<br /><br />
					<div id="loadingIcon"></div>
					<div id="infoDiv" class="ui-content">
						<div id="dataTime"></div>
						<div id="dataLoaded"></div>
						<div id="dataGraphed"></div>
						<div id="dataMetrics"></div>
					</div>
				</div>
				
				<div id="p11CanvasDiv">
					<div id="p11CanvasTitle" class="canvasTitle"></div>
					<div id="p11YAxisTitle" class="yAxisTitle"></div>
					<div id="p11XAxisTitle" class="xAxisTitle"></div>
					<canvas id="p11Graph" class="graph"></canvas>
					<canvas id="p11DataPoints" class="dataPoints"></canvas>
				</div>
			</div>
			
			<div id="bottomPane">
				<div id="scatData" style="display: none; visibility: hidden;"></div>
				<div id="coefficientData" style="display: none; visibility: hidden;"></div>
			</div>
		</div>
	</body>
</html>
