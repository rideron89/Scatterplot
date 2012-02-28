<?php
	$fileName = "../" . $_POST["dataFile"];
	
	if(stristr($fileName, "scat"))
	{
		$data = file_get_contents($fileName);
		$data = str_ireplace("\n", "+", $data);

		$years = explode("+", $data);

		for($i = 0; $i < count($years); $i++)
		{
			$columns = explode(",", $years[$i]);

			$start = $columns[0];
			$end = $columns[1];

			if(($end-$start) >= ($end-$_POST["time"]))
				$data = $years[$i];
		}
	}
	else
	{
		$data = file_get_contents($fileName);
		$data = str_ireplace("\n", "+", $data);
	}
	
	echo $data;
?>
