<?php
	$fileName = "../data/coefficient.txt";
	
	$data = file_get_contents($fileName);
	$data = str_replace("\n", "+", $data);

	$years = explode("+", $data);
	
	$data = "";

	for($i = 1; $i < count($years); $i++)
	{
		$columns = explode(",", $years[$i]);
		
		$data .= $columns[6] . ",";
	}
	
	echo $data;
?>
