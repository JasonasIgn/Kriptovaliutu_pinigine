<?php
class Tokenas{
 
    // database connection and table name
    private $conn;
    private $table_name = "Tokenas";
 
    // object properties
    public $Id;
    public $Tokenas;
    public $Sukurimo_data;
    public $Tipas;
    public $Teises;
    public $fk_PaskyraId;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	// create product
	function createLogin($teises, $id){
	 
		// sanitize
		$this->Teises = $teises;
		$this->fk_PaskyraId = $id;
		$this->Tipas = 1;
		$this->Sukurimo_data = date('Y-m-d H:i:s');
		$this->Tokenas = md5(uniqid(rand(), true));
	 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					Teises='{$this->Teises}', fk_PaskyraId='{$this->fk_PaskyraId}', Tipas='{$this->Tipas}', Sukurimo_data='{$this->Sukurimo_data}', Tokenas='{$this->Tokenas}'";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
		if ($stmt->errno == 0) return $this->Tokenas;
		else return null;
		 
	}
}
