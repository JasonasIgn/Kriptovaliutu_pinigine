<?php
class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "ignjas";
    private $username = "root";
    private $password = "";
    public $conn;
 
    // get the database connection
    public function getConnection(){
		$this->conn = null;        
			$this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
			if (mysqli_connect_errno()) {
				printf("Connect failed: %s\n", mysqli_connect_error());
				exit();
			}

		return $this->conn;
    }
}
?>