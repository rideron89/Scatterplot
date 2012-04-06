<?php
	$fileName = "../loc.txt";
	$time = $_POST["time"];
	
	$data = file_get_contents($fileName);
	$data = str_replace("\n", "+", $data);

	$years = explode("+", $data);
	
	$data = "";

	for($i = 1; $i < count($years); $i++)
	{
		$columns = explode(",", $years[$i]);
		
		if($time == $columns[0])
			$data = $years[$i];
	}
	
	echo $data;
?>
