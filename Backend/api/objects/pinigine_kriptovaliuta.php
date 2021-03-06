<?php
class Pinigine_kriptovaliuta{
 
    // database connection and table name
    private $conn;
    private $table_name = "pinigine_kriptovaliuta";
 
    // object properties
    public $Balansas;
    public $id_Pinigine_Kriptovaliuta;
    public $fk_KriptovaliutaId;
    public $fk_PinigineId;

 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function Exchange($exchangeFromValue, $exchangeFromId, $exchangeToValue, $exchangeToId, $walletId){
	// select all query
		$code = -1;
		if ($exchangeFromId == 0)
		{
			$query = "UPDATE pinigine
					SET
						Balansas_EUR = Balansas_EUR - {$exchangeFromValue} WHERE Id='{$walletId}'";
						
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			$code = $stmt->errno;
		}
		else {
			$query = "SELECT * FROM
						" . $this->table_name . "
					WHERE
						fk_KriptovaliutaId='{$exchangeFromId}' AND fk_PinigineId='{$walletId}'";
		 
			$result = $this->conn->query($query);
			if ($result->num_rows > 0)
			{
				$query = "UPDATE
							" . $this->table_name . "
						SET
							Balansas = Balansas - {$exchangeFromValue} WHERE fk_KriptovaliutaId='{$exchangeFromId}' AND fk_PinigineId='{$walletId}'";
							
				$stmt = $this->conn->prepare($query);
				$stmt->execute();
				$code = $stmt->errno;
			}
			else return 400;
		}
		
		if ($code == 0) {	//Jei atemimas pavyko
				
			if ($exchangeToId == 0)
			{
				$query = "UPDATE pinigine
						SET
							Balansas_EUR = Balansas_EUR + {$exchangeToValue} WHERE Id='{$walletId}'";
							
				$stmt = $this->conn->prepare($query);
				$stmt->execute();
				$code = $stmt->errno;
				return $code;
			}
			else {
				$query = "SELECT * FROM
							" . $this->table_name . "
						WHERE
							fk_KriptovaliutaId='{$exchangeToId}' AND fk_PinigineId='{$walletId}'";
			 
				$result = $this->conn->query($query);
				if ($result->num_rows > 0)
				{
					$query = "UPDATE
								" . $this->table_name . "
							SET
								Balansas = Balansas + {$exchangeToValue} WHERE fk_KriptovaliutaId='{$exchangeToId}' AND fk_PinigineId='{$walletId}'";
								
					$stmt = $this->conn->prepare($query);
					$stmt->execute();
					$code = $stmt->errno;
					return $code;
				}
				else {
					$query = "INSERT INTO
						" . $this->table_name . "
					SET
						Balansas = {$exchangeToValue}, fk_KriptovaliutaId='{$exchangeToId}', fk_PinigineId='{$walletId}'";
						
					$stmt = $this->conn->prepare($query);
					$stmt->execute();
					$code = $stmt->errno;
					return $code;
				}
					
			}
		}
		else return 400;
	}
	function Send($sendValue, $sendId, $receiverAddress, $ownerWalletId){
	// select all query
		$code = -1;
		$query = "SELECT * FROM
					" . $this->table_name . "
				WHERE
					fk_KriptovaliutaId='{$sendId}' AND fk_PinigineId='{$ownerWalletId}'";
	 
		$result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			$query = "UPDATE
						" . $this->table_name . "
					SET
						Balansas = Balansas - {$sendValue} WHERE fk_KriptovaliutaId='{$sendId}' AND fk_PinigineId='{$ownerWalletId}'";
						
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			$code = $stmt->errno;
		}
		else return 400;
		
		if ($code == 0) {	//Jei atemimas pavyko
				
			$query = "SELECT Id FROM pinigine
					WHERE
						Adresas='{$receiverAddress}'";
		 
			$result = $this->conn->query($query);
			if ($result->num_rows > 0)
			{
				$id = $result->fetch_assoc()["Id"];
				$query = "SELECT * FROM
						" . $this->table_name . "
					WHERE
						fk_KriptovaliutaId='{$sendId}' AND fk_PinigineId='{$id}'";
				$result = $this->conn->query($query);
				if ($result->num_rows > 0)
				{
					$query = "UPDATE
								" . $this->table_name . "
							SET
								Balansas = Balansas + {$sendValue} WHERE fk_KriptovaliutaId='{$sendId}' AND fk_PinigineId='{$id}'";
								
					$stmt = $this->conn->prepare($query);
					$stmt->execute();
					$code = $stmt->errno;
					return $code;
				}
				else {
					$query = "INSERT INTO
						" . $this->table_name . "
					SET
						Balansas = {$sendValue}, fk_KriptovaliutaId='{$sendId}', fk_PinigineId='{$id}'";
						
					$stmt = $this->conn->prepare($query);
					$stmt->execute();
					$code = $stmt->errno;
					return $code;
				}
			}
			else return 999; //No such wallet address
			
		}
		else return 400;
	}
	
	function getById($id){
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
	
	function getByTwoIds($walletId, $cryptoId){
        // select all query
        $query = "SELECT * FROM {$this->table_name} WHERE fk_PinigineId='{$walletId}' AND fk_KriptovaliutaId='{$cryptoId}'";
    
        // execute query
        $result = $this->conn->query($query);
		if ($result->num_rows > 0)
		{
			return $result->fetch_assoc();
		}
		else return null;
    }
}

