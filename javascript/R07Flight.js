var width = 640;
var height = 360;

var map = null;
var options = null;
var styler = null;

var flightPath = null;
var coords = [];
var marker = null;

function buildMap()
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?";
	script.src += "key=AIzaSyBRnDZ0cm7ixweeLTcV9ef_IfdOyxKf1ls&";
	script.src += "sensor=true&callback=R07Map";
	document.body.appendChild(script);
}

function movePlaneMarker()
{
	marker.setPosition(coords.getAt(time));
}

function R07Map()
{
	function setupMap()
	{
		var map = document.getElementById("mapCanvas");
		
		map.style.width = "100%";
		map.style.height = "100%";
	}
	
	function initializeMap()
	{
		styler = [
			{
				elementType: "labels",
				stylers: [
					{
						visibility: "off"
					}
				]
			}
		];
		
		options = {
			center: new google.maps.LatLng(37.00, -75.50),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			styles: styler
		};
		
		map = new google.maps.Map(document.getElementById("mapCanvas"),
			options);
	}
	
	function loadCoords()
	{
		$.ajax({
			type: "POST",
			url: "php/scripts/getCoordinates.php",
			success: drawPath,
			dataType: "text"
		});
	}
	
	function drawPath(output)
	{
		var unparsedCoords = output.split(",");
		//var flightPath = null;
		var lat = 0;
		var lon = 0
		
		flightPath = new google.maps.Polyline({
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
		
		coords = flightPath.getPath();
		
		for(var i = 0; i < unparsedCoords.length-1; i++)
		{
			lat = parseFloat(unparsedCoords[i].split("+")[0]);
			lon = parseFloat(unparsedCoords[i].split("+")[1]) * -1.0;
			
			coords.push(new google.maps.LatLng(lat, lon));
		}
		
		flightPath.setMap(map);
		
		setupMarker();
	}
	
	function setupMarker()
	{
		marker = new google.maps.Marker({
			position: coords.getAt(0),
			map: map,
			title: "Plane's Location",
			icon: "style/aircraftsmall.png"
		});
	}
	
	setupMap();
	initializeMap();
	loadCoords();
}
