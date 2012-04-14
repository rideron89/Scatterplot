<?php
	include_once("../mysql.php");
	
	$dbse = "pi_neph";
	
	$con = connect($dbse);
	
	try
	{
		$query = "SELECT * FROM location WHERE mid_utc = ?";
		
		$param = array($_POST["time"]);
		
		$statement = $con->prepare($query);
		
		$statement->execute($param);
		
		$data = "";
		
		$result = $statement->fetchObject();
		
		$data .= (float)$result->lat_deg . ",";
		$data .= (float)$result->lat_min . ",";
		$data .= (float)$result->lat_sec . ",";
		$data .= (float)$result->lon_deg . ",";
		$data .= (float)$result->lon_min . ",";
		$data .= (float)$result->lon_sec . ",";
		$data .= $result->gps_altitude . ",";
		$data .= $result->static_air_pres . ",";
		$data .= $result->static_air_temp . ",";
		$data .= $result->dew_point_temp . ",";
		$data .= $result->cn_greater_10nm . ",";
	}
	catch(PDOException $e)
	{
		echo ("!" . $e->getMessage());
	}
	
	echo $data;
?>
