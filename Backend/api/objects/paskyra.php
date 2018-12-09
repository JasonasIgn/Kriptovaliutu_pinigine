<?php
class Paskyra{
 
    // database connection and table name
    private $conn;
    private $table_name = "Paskyra";
 
    // object properties
    public $Id;
    public $El_pastas;
    public $Slaptazodis;
    public $Vardas;
    public $Pavarde;
    public $Adresas;
    public $Tel_numeris;
	public $Gimimo_data;
	public $Blokuota;
	public $Teises;
	public $Lytis;
	public $fk_Sistemos_informacijaId;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	// create product
	function create(){
	 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					Vardas=:vardas, Pavarde=:pavarde, El_pastas=:el_pastas, Slaptazodis=:slaptazodis";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->vardas=htmlspecialchars(strip_tags($this->vardas));
		$this->pavarde=htmlspecialchars(strip_tags($this->pavarde));
		$this->el_pastas=htmlspecialchars(strip_tags($this->el_pastas));
		$this->slaptazodis=htmlspecialchars(strip_tags($this->slaptazodis));
	 
		// bind values
		$stmt->bindParam(":name", $this->vardas);
		$stmt->bindParam(":price", $this->pavarde);
		$stmt->bindParam(":description", $this->el_pastas);
		$stmt->bindParam(":category_id", $this->slaptazodis);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}
