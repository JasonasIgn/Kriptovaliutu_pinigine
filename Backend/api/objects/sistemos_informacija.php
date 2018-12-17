<?php
class Sistemos_informacija{
 
    // database connection and table name
    private $conn;
    private $table_name = "sistemos_informacija";
 
    public $Id;
    public $Vartotoju_kiekis;
    public $Transakciju_kiekis;
    public $Isjungta;
    public $Pranesimas;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	function IncrementUsers(){ 
		// query to insert record
		$query = "UPDATE
					" . $this->table_name . "
				SET
					Vartotoju_kiekis = Vartotoju_kiekis + 1 WHERE Id=0";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
		return $stmt->errno;
		 
	}
    function get(){
        // select all query
        $query = "SELECT * FROM {$this->table_name} WHERE Id=0";
    
        // execute query
        $result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			$json = $result->fetch_assoc();
			return $json;
		}
		else return null;
    }
}
?>