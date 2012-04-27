<?php
	include_once("../mysql.php");
	
	$dbse = "pi_neph";
	
	$con = connect($dbse);
	
	try
	{
		$query = "SELECT * FROM p11 WHERE mid_utc = ?";
		
		$param = array($_POST["time"]);
		
		$statement = $con->prepare($query);
		
		$statement->execute($param);
		
		$data = "";
		
		$result = $statement->fetch();
		
		for($i = 2; $i <= 176; $i++)
			$data .= $result["degree".$i] . ",";
	}
	catch(PDOException $e)
	{
		echo ("!" . $e->getMessage());
	}
	
	echo $data;
?>
