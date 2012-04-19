<?php
	include_once("../mysql.php");
	
	$dbse = "pi_neph";
	
	$con = connect($dbse);
	
	try
	{
		$query = "SELECT * FROM seconds WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$times = array();
		
		while($result = $statement->fetchObject())
			array_push($times, $result->mid_utc);

		$query = "SELECT * FROM location WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$data = "";
		$lat = 0.0;
		$lon = 0.0;
		
		while($result = $statement->fetchObject())
		{
			if(in_array($result->mid_utc, $times))
			{
				$lat = $result->lat_deg + ($result->lat_min/60) + ($result->lat_sec/3600);
				$lon = $result->lon_deg + ($result->lon_min/60) + ($result->lon_sec/3600);
				
				$data .= $lat . "+" . ($lon * -1.00) . ",";
			}
		}
	}
	catch(PDOException $e)
	{
		echo ("!" . $e->getMessage());
	}
	
	echo $data;
?>
