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
	 
		// sanitize
		$this->Vardas=htmlspecialchars(strip_tags($this->Vardas));
		$this->Pavarde=htmlspecialchars(strip_tags($this->Pavarde));
		$this->El_pastas=htmlspecialchars(strip_tags($this->El_pastas));
		$this->Slaptazodis=htmlspecialchars(strip_tags($this->Slaptazodis));
	 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					Vardas='{$this->Vardas}', Pavarde='{$this->Pavarde}', El_pastas='{$this->El_pastas}', Slaptazodis='{$this->Slaptazodis}'";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
		return $stmt->errno;
		 
	}
}
