<?php
	include_once("../mysql.php");
	
	$dbse = "pi_neph";
	
	$con = connect($dbse);
	
	try
	{
		$query = "SELECT * FROM scat_coefficient WHERE mid_utc = ?";
		
		$param = array($_POST["time"]);
		
		$statement = $con->prepare($query);
		
		$statement->execute($param);
		
		$data = "";
		
		$result = $statement->fetchObject();
		
		$data .= $result->start_utc . ",";
		$data .= $result->end_utc . ",";
		$data .= $result->mid_utc . ",";
		$data .= $result->hh_utc . ",";
		$data .= $result->mm_utc . ",";
		$data .= $result->ss_utc . ",";
		$data .= $result->scat . ",";
		$data .= $result->pressure . ",";
		$data .= $result->rhInlet . ",";
		$data .= $result->rhChamber . ",";
		$data .= $result->rhOutlet . ",";
		$data .= $result->temperature . ",";
	}
	catch(PDOException $e)
	{
		echo ("!" . $e->getMessage());
	}
	
	echo $data;
?>
