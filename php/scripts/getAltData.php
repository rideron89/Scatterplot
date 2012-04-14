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

		$query = "SELECT mid_utc,gps_altitude FROM location WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$data = "";
		
		while($result = $statement->fetchObject())
			if(in_array($result->mid_utc, $times))
				$data .= $result->gps_altitude . ",";
	}
	catch(PDOException $e)
	{
		echo ("!" . $e->getMessage());
	}
	
	echo $data;
?>
