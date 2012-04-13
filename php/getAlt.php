<?php
	$fileName = "../data/loc.txt";
	$scatFile = "../data/scat.txt";
	
	$data = file_get_contents($fileName);
	$data = str_replace("\n", "+", $data);
	
	$times = file_get_contents($scatFile);
	$times = str_replace("\n", "+", $times);

	$years = explode("+", $data);
	
	$times = explode("+", $times);
	
	$data = "";
	$j = 1;

	for($i = 1; $i < count($years); $i++)
	{
		$columns = explode(",", $years[$i]);
		$columns2 = explode(",", $times[$j]);
		
		if($columns[0] == $columns2[2])
		{
			$data .= $columns[7] . ",";
			$j++;
		}
	}
	
	echo $data;
?>
