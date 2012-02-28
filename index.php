<?php
	//include_once($_SERVER["DOCUMENT_ROOT"] . "/php/login.php");
	
	//do_login();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>
			Scatterplot
		</title>
		<link href="/styles/general.css" rel="stylesheet" type="text/css" />
		<link href="/styles/communityBarStyle.css" rel="stylesheet" type="text/css" />
		<link href="/styles/scatter.css" rel="stylesheet" type="text/css" />
		<script src="javascript/scatter.js"></script>
		<script>
			var graph = new Scatterplot("scatterplot", "scatterPlots");
			
			function go()
			{
				graph.init(document.getElementById("graphDataList").value);
				
				if(document.getElementById("graphDataList").value.indexOf("scat") != -1)
				{
					document.getElementById("canvasTitle").innerHTML = "Polarized Imaging Nephelometer";
					document.getElementById("yAxisTitle").innerHTML = "Degrees";
					document.getElementById("xAxisTitle").innerHTML = "X-Axis";
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
		</script>
	</head>
	<body onload="updateRange()">
		<div id="communityBar">
			<?php
				//include($_SERVER["DOCUMENT_ROOT"] . "/php/communityBar.php");
			?>
		</div>
		
		<div id="headerBox">
			<div id="logoText"></div>
		</div>
		
		<div id="mainBox">
			<div id="topPane">
			</div>
			
			<div id="midPane">
				<!-- Settings on left-hand side of screen -->
				<div id="leftSettings">
					<select id="graphDataList" class="ui-widget ui-widget-text" type="select" title="Please note redrawing the graph may take time." onchange="go()">
						<option value="scat.txt">Scat  Data</option>
						<option value="data.txt">Other Data</option>
					</select>
					<br /><br />
					<div id="rangeDiv">
						Graph Time (Seconds)<br />
						<span id="rangeLow"></span>
						<input id="timeRange" type="range" min ="64665" max="73901" step="100" value="64665" onchange="updateRange()" />
						<span id="rangeHigh"></span><br />
						<span id="rangeCurrent"></span>
					</div>
					<br /><br />
					<div id="loadingIcon"></div>
					<div id="infoDiv" class="ui-content">
						<div id="dataTime"></div>
						<div id="dataLoaded"></div>
						<div id="dataGraphed"></div>
						<div id="dataMetrics"></div>
						<div id="pointValues"></div>
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
