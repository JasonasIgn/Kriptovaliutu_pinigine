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
					Vardas=:Vardas, Pavarde=:Pavarde, El_pastas=:El_pastas, Slaptazodis=:Slaptazodis";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
		// sanitize
		$this->Vardas=htmlspecialchars(strip_tags($this->Vardas));
		$this->Pavarde=htmlspecialchars(strip_tags($this->Pavarde));
		$this->El_pastas=htmlspecialchars(strip_tags($this->El_pastas));
		$this->Slaptazodis=htmlspecialchars(strip_tags($this->Slaptazodis));
	 
		// bind values
		$stmt->bindParam(":Vardas", $this->Vardas);
		$stmt->bindParam(":Pavarde", $this->Pavarde);
		$stmt->bindParam(":El_pastas", $this->El_pastas);
		$stmt->bindParam(":Slaptazodis", $this->Slaptazodis);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
}
