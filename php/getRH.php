<?php
	$fileName = "../data/coefficient.txt";
	
	$data = file_get_contents($fileName);
	$data = str_replace("\n", "+", $data);

	$years = explode("+", $data);
	
	$data = "";

	for($i = 1; $i < count($years); $i++)
	{
		$columns = explode(",", $years[$i]);
		
		if($_POST["index"] == "1")
			$data .= $columns[8] . ",";
		else if($_POST["index"] == "2")
			$data .= $columns[9] . ",";
		else if($_POST["index"] == "3")
			$data .= $columns[10] . ",";
	}
	
	echo $data;
?>
