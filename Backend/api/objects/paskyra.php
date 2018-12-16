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
					Vardas='{$this->Vardas}', Pavarde='{$this->Pavarde}', El_pastas='{$this->El_pastas}', Slaptazodis='{$this->Slaptazodis}', Teises='{$this->Teises}', Blokuota='{$this->Blokuota}' ";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
		return $stmt->errno;
		 
	}
	
	
	function update(){
	 
		// sanitize
		$this->Id=htmlspecialchars(strip_tags($this->Id));
		$this->Vardas=htmlspecialchars(strip_tags($this->Vardas));
		$this->Pavarde=htmlspecialchars(strip_tags($this->Pavarde));
		$this->Adresas=htmlspecialchars(strip_tags($this->Adresas));
		$this->Tel_numeris=htmlspecialchars(strip_tags($this->Tel_numeris));
		$this->Gimimo_data=htmlspecialchars(strip_tags($this->Gimimo_data));
		$this->Lytis=htmlspecialchars(strip_tags($this->Lytis));
	 
		// query to insert record
		$query = "UPDATE
					" . $this->table_name . "
				SET
					Vardas='{$this->Vardas}', Pavarde='{$this->Pavarde}', Adresas='{$this->Adresas}', Tel_numeris='{$this->Tel_numeris}', Gimimo_data='{$this->Gimimo_data}', Lytis='{$this->Lytis}' 
				WHERE Id='{$this->Id}'";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
		return $stmt->errno;
		 
	}
	
	function getId ($email) {
		$query = "SELECT Id FROM
					" . $this->table_name . "
				WHERE
					El_pastas='{$email}'";
	 
		$result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			return $result->fetch_assoc()['Id'];
		}
		else return null;
	}
	
	function getById ($id) {
		$query = "SELECT Teises, Id, Vardas, Pavarde, El_pastas, Blokuota, Adresas, Tel_numeris, Lytis, Gimimo_data FROM
					" . $this->table_name . "
				WHERE
					Id='{$id}'";
	 
		$result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			return $result->fetch_assoc();
		}
		else return null;
	}
	
	function login(){
	 
		// sanitize
		$this->El_pastas=htmlspecialchars(strip_tags($this->El_pastas));
		$this->Slaptazodis=htmlspecialchars(strip_tags($this->Slaptazodis));
	 
		// query to insert record
		$query = "SELECT Teises, Id, Vardas, Pavarde, El_pastas, Blokuota, Adresas, Tel_numeris, Lytis, Gimimo_data FROM
					" . $this->table_name . "
				WHERE
					El_pastas='{$this->El_pastas}' AND Slaptazodis='{$this->Slaptazodis}'";
	 
		// prepare query
		$result = $this->conn->query($query);
	 
		if ($result->num_rows > 0)
		{
			return $result->fetch_assoc();
		}
		 return null;
	}

	function getAll()
	{
		// query to insert record Teises, Id, Vardas, Pavarde, El_pastas, Blokuota
		$query = "SELECT Teises, Vardas, El_pastas, Blokuota, Id, Vardas, Pavarde FROM " . $this->table_name;
	 
		// prepare query
		$result = $this->conn->query($query);
	 
		if ($result->num_rows > 0)
		{
			return $result;
		}
		 return null;
	}

	function blockUser($id)
	{
		// query to insert record
		if($id != null)
		{
			$query = "UPDATE " . $this->table_name . "
			SET
				Blokuota=1 WHERE Id='{$id}'";
		 
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			return $stmt;
		}
		else return null;
	}
	function changeUserLevel($id, $teises)
	{
		if($id != null && $teises!=null)
		{
			// query to insert record
			$query = "UPDATE
			" . $this->table_name . "
			SET
				Teises='{$teises}' WHERE Id='{$id}'";
		
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			return $stmt->errno;
		}
		else return null;
	}
}
