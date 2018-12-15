<?php
class Kortele{
 
    // database connection and table name
    private $conn;
    private $table_name = "mokejimo_kortele";
 
    public $Id;
    public $Numeris;
    public $Kodas;
    public $Galioja_iki;
    public $Pridejimo_data;
    public $fk_PinigineId;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	function create(){
		// sanitize
		$this->Pridejimo_data = date('Y-m-d H:i:s');
	 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					Numeris='{$this->Numeris}', Kodas='{$this->Kodas}', Galioja_iki='{$this->Galioja_iki}', Pridejimo_data='{$this->Pridejimo_data}', fk_pinigineId='{$this->fk_pinigineId}'";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
		return $stmt->errno;
		 
	}
    function get($id){
        // select all query
        $query = "SELECT * FROM {$this->table_name} WHERE fk_PinigineId='{$id}'";
    
        // execute query
        $result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc()){
				 $json[] = $row;
			}
			return $json;
		}
		else return null;
    }
}
?>