<?php
	include_once("../mysql.php");
	
	$dbse = "pi_neph";
	
	$con = connect($dbse);
	
	try
	{
		$query = "SELECT rhInlet FROM scat_coefficient WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$data = "";
		
		while($result = $statement->fetchObject())
			$data .= $result->rhInlet . ",";
		
		$query = "SELECT rhChamber FROM scat_coefficient WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$data .= "+";
		
		while($result = $statement->fetchObject())
			$data .= $result->rhChamber . ",";
	
		$query = "SELECT rhOutlet FROM scat_coefficient WHERE 1";
		
		$statement = $con->prepare($query);
		
		$statement->execute();
		
		$data .= "+";
		
		while($result = $statement->fetchObject())
			$data .= $result->rhOutlet . ",";
	}
	catch(PDOException $e)
	{
		echo ("!" . $e->getMessage());
	}
	
	echo $data;
?>
