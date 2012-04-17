var width = 640;
var height = 360;

var map = null;
var options = null;
var styler = null;

function buildMap()
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?";
	script.src += "key=AIzaSyBRnDZ0cm7ixweeLTcV9ef_IfdOyxKf1ls&";
	script.src += "sensor=true&callback=R07Map";
	document.body.appendChild(script);
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
			center: new google.maps.LatLng(37.40, -75.50),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.SATELLITE,
			styles: styler
		};
		
		map = new google.maps.Map(document.getElementById("mapCanvas"),
			options);
	}
	
	setupMap();
	initializeMap();
}