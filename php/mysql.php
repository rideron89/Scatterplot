<?php
	/*
	 * Try and connect to the MySQL database.
	 */
	function connect($dbse)
	{
		// Initialize database connection info
		$host = "localhost";
		$port = 3306;
		$user = "reader";
		$pass = "neph56";

		// Construct the Data Source Name (DSN)
		$dsn = "mysql:host=$host;port=$port;dbname=$dbse";

		try
		{
			// Connect to the database
			$con = new PDO($dsn, $user, $pass);

			// Set error/warning level
			$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			return $con;
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}
?>
