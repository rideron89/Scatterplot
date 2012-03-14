<?php
	$fileName = "../" . $_POST["dataFile"];
	
	if(stristr($fileName, "scat"))
	{
		$data = file_get_contents($fileName);
		$data = str_replace("\n", "+", $data);

		$years = explode("+", $data);
		
		$data = "";

		for($i = 1; $i < count($years); $i++)
		{
			$columns = explode(",", $years[$i]);

			$start = $columns[0];
			$end = $columns[1];

			$data .= $start . ",";
		}
	}
	else
	{
		$data = file_get_contents($fileName);
		$data = str_replace("\n", "+", $data);
	}
	
	echo $data;
?>
