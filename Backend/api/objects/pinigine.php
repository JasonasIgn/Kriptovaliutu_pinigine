<?php
class Pinigine{
 
    // database connection and table name
    private $conn;
    private $table_name = "pinigine";
 
    public $Id;
    public $Adresas;
    public $Balansas_USD;
    public $Balansas_EUR;
    public $Blokuota;
    public $fk_PaskyraId;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	function create($id){
		if ($id != null) 
		{
			// sanitize
			$this->Adresas=md5(uniqid(rand(), true));
			$this->fk_PaskyraId=$id;
			$this->Balansas_USD=0;
			$this->Balansas_EUR=0;
			$this->Blokuota=0;
		 
			// query to insert record
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
						Adresas='{$this->Adresas}', fk_PaskyraId='{$this->fk_PaskyraId}', Balansas_USD='{$this->Balansas_USD}', Balansas_EUR='{$this->Balansas_EUR}', Blokuota='{$this->Blokuota}'";
		 
			// prepare query
			$stmt = $this->conn->prepare($query);
		 
			// execute query
			$stmt->execute();
			return $stmt->errno;
		}
		else return null;
		 
	}
    // read pinigine
    function getById($id){
        // select all query
        $query = "SELECT * FROM pinigine WHERE fk_PaskyraId='{$id}'";
    
        // execute query
        $result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			return $result->fetch_assoc();
		}
		else return null;
    }
	
	function addToBalance($id, $suma)
	{
		if ($id != null && $suma != null) 
		{
		$query = "UPDATE
						" . $this->table_name . "
					SET
						Balansas_EUR = Balansas_EUR + {$suma} WHERE Id='{$id}'";
		 $stmt = $this->conn->prepare($query);
		 
			// execute query
			//return $query;
			$stmt->execute();
			return $stmt->errno;
		}
		else return null;
	}
	
	function widthdrawBalance($id, $suma)
	{
		if ($id != null && $suma != null) 
		{
			
		$query = "SELECT Balansas_EUR FROM pinigine WHERE fk_PaskyraId='{$id}'";
		
		$result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			$balance = $result->fetch_assoc()['Balansas_EUR'];
			if ($balance > $suma) {
				$query = "UPDATE
						" . $this->table_name . "
					SET
						Balansas_EUR = Balansas_EUR - {$suma} WHERE fk_PaskyraId='{$id}'";
						
				$stmt = $this->conn->prepare($query);
				$stmt->execute();
				return $stmt->errno;
			}
			else return 1000; //Nepakanka pinigu
		}
		else return null;
			
		$query = "UPDATE
						" . $this->table_name . "
					SET
						Balansas_EUR = Balansas_EUR + {$suma} WHERE Id='{$id}'";
		 $stmt = $this->conn->prepare($query);
		 
			// execute query
			//return $query;
			$stmt->execute();
			return $stmt->errno;
		}
		else return null;
	}

    function readBalanse(){
        $query = "SELECT Balansas_USD, Balansas_EUR FROM pinigine WHERE fk_PaskyraId = ? LIMIT 0,1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(1, $this->fk_PaskyraId);
        // execute query
        $stmt->execute();
    
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->Balansas_USD = $row['Balansas_USD'];
        $this->Balansas_EUR = $row['Balansas_EUR'];
    }
	
	
    function readBalanseFromID($Id){
        $query = "SELECT Balansas_USD, Balansas_EUR FROM pinigine WHERE fk_PaskyraId =".$Id." LIMIT 0,1";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(1, $this->fk_PaskyraId);
        // execute query
        $stmt->execute();
    
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->Balansas_USD = $row['Balansas_USD'];
        $this->Balansas_EUR = $row['Balansas_EUR'];
    }

    function updateBalanse(){
        $query = "UPDATE
                " . $this->table_name . "
            SET
                Balansas_USD = :USD,
                Balansas_EUR = :EUR
            WHERE
                fk_PaskyraId = :Id";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->Balanasas_USD=htmlspecialchars(strip_tags($this->Balanasas_USD));
    $this->Balansas_EUR=htmlspecialchars(strip_tags($this->Balansas_EUR));
    $this->fk_PaskyraId=htmlspecialchars(strip_tags($this->fk_PaskyraId));
 
    // bind new values
    $stmt->bindParam(':USD', $this->Balansas_USD);
    $stmt->bindParam(':EUR', $this->Balansas_EUR);
    $stmt->bindParam(':Id', $this->fk_PaskyraId);
 
    // execute the query
    if($stmt->execute()){
        return true;
    }
 
    return false;
    }
}
?>