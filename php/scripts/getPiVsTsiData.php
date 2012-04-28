<?php
	include_once("../mysql.php");
	
	$dbse = "pi_neph";
	
	$con = connect($dbse);
	
	try
	{
		$query = "SELECT scat FROM scat_coefficient WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$data = "";
		
		while($result = $statement->fetchObject())
			$data .= $result->scat . ",";
		
		///////////////////////////////////////////
		
		$query = "SELECT * FROM seconds WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$times = array();
		
		while($result = $statement->fetchObject())
			array_push($times, $result->mid_utc);

		$query = "SELECT mid_utc,tot550 FROM b200 WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$data .= "+";
		
		while($result = $statement->fetch())
			if(in_array($result["mid_utc"], $times))
				$data .= $result["tot550"] . ",";
	}
	catch(PDOException $e)
	{
		echo ("!" . $e->getMessage());
	}
	
	echo $data;
?>
