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
	}
	catch(PDOException $e)
	{
		echo ("!" . $e->getMessage());
	}
	
	echo $data;
?>
