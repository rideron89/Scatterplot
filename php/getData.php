<?php
	$fileName = "../data/" . $_POST["dataFile"];
	
	$data = file_get_contents($fileName);
	$data = str_replace("\n", "+", $data);

	$years = explode("+", $data);
	
	$data = "";

	for($i = 1; $i < count($years); $i++)
	{
		$columns = explode(",", $years[$i]);

		$start = $columns[0];
		$mid = $columns[2];
		$end = $columns[1];
		
		//if($_POST["time"] == $mid)
		if($_POST["time"] == ($i-1))
			$data = $years[$i];
	}
	
	echo $data;
?>
