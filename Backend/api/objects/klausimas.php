<?php
class Klausimas{
 
    // database connection and table name
    private $conn;
    private $table_name = "Klausimas";
 
    // object properties
    public $Id;
    public $Klausimas;
    public $Sukurimo_data;
    public $Atsakytas;
    public $fk_PaskyraId;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	// create product
	function create($id, $Klausimas){
        if ($id != null)
        {
                // sanitize
            $this->Klausimas=$Klausimas;
            $this->fk_PaskyraId=$id;
            $this->Sukurimo_data=date("Y-m-d");
            $this->Atsakytas=0;
            // query to insert record
            $query = "INSERT INTO
                        " . $this->table_name . "
                    SET
                    Klausimas='{$this->Klausimas}', fk_PaskyraId='{$this->fk_PaskyraId}', Sukurimo_data='{$this->Sukurimo_data}', Atsakytas='{$this->Atsakytas}'";
        
            // prepare query
            $stmt = $this->conn->prepare($query);
        
            // execute query
            $stmt->execute();
            return $stmt->errno;
        }
        else return null;
    }
    function getById($id){
        // select all query
        $query = "SELECT * FROM " . $this->table_name . " WHERE fk_PaskyraId='{$id}'";
    
        // execute query
        $result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			return $result;
		}
		else return null;
    }
    function getAll(){
        // select all query
        $query = "SELECT * FROM " . $this->table_name;
    
        // execute query
        $result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			return $result;
		}
		else return null;
    }
}
