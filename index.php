<!DOCTYPE html>
<html>
	<head>
		<title>
			Scatterplot
		</title>
		<link href="./style/scatter.css" rel="stylesheet" type="text/css" />
		<script src="javascript/scatter.js"></script>
		<script>
			var graph = new Scatterplot("scatterplot", "scatterPlots");
			
			function go()
			{
				graph.init(document.getElementById("graphDataList").value);
				
				if(document.getElementById("graphDataList").value.indexOf("scat") != -1)
				{
					document.getElementById("canvasTitle").innerHTML = "Polarized Imaging Nephelometer";
					document.getElementById("xAxisTitle").innerHTML = "P11 or Phase Function [degrees]";
					document.getElementById("yAxisTitle").innerHTML = "Y-Axis";
					document.getElementById("rangeDiv").style.display = "block";
					graph.doScatter(document.getElementById("timeRange").value);
				}
				else
				{
					document.getElementById("canvasTitle").innerHTML = "Other Data Graph";
					document.getElementById("rangeDiv").style.display = "none";
					graph.doNormal();
				}
				
				graph.draw();
			}
			
			function updateRange()
			{
				go();
				document.getElementById("rangeCurrent").innerHTML = document.getElementById("timeRange").value;
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
	<body onload="updateRange()">
		<div id="mainBox">
			<div id="topPane">
			</div>
			
			<div id="midPane">
				<!-- Settings on left-hand side of screen -->
				<div id="leftSettings">
					<select id="graphDataList" class="ui-widget ui-widget-text" title="Please note redrawing the graph may take time." onchange="go()">
						<option value="scat.txt">Scat  Data</option>
						<option value="data.txt">Other Data</option>
					</select>
					<br /><br />
					<div id="rangeDiv">
						Graph Time (Seconds)<br />
						<input id="timeMinus" type="button" value="-" onclick="decrement()" />
						<input id="timeRange" type="range" min ="64665" max="73901" step="30" value="67395" onchange="updateRange()" />
						<input id="timePlus" type="button" value="+" onclick="increment()" /><br />
						<span id="rangeCurrent"></span>
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
				
				<div id="canvasDiv">
					<div id="canvasTitle"></div>
					<div id="yAxisTitle"></div>
					<div id="xAxisTitle"></div>
					<canvas id="scatterplot"></canvas>
					<canvas id="scatterPlots"></canvas>
				</div>
			</div>
			
			<div id="bottomPane">
				<div id="data" style="display: none; visibility: hidden;">
				</div>
			</div>
		</div>
	</body>
</html>
