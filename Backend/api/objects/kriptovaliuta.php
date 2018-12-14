<?php
class Kriptovaliuta{
 
    // database connection and table name
    private $conn;
    private $table_name = "Kriptovaliuta";
 
    // object properties
    public $Id;
    public $Trumpinys;
    public $Pavadinimas;
    public $Kursas;

 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function GetCryptocurrencies(){
	// select all query

	$query = "SELECT Trumpinys, `Pavadinimas`, `Kursas` 
           FROM kriptovaliuta";

	// prepare query statement

	$stmt = $this->conn->prepare($query);

	// execute query

	$stmt->execute();
	return $stmt;
}

public function GetCryptocurrencyExchangeRate($name){
    $query = "SELECT `Pavadinimas`, `Kursas`
            FROM kriptovaliuta
            WHERE kriptovaliuta.Pavadinimas = '$name'";

   $stmt = $this->conn->prepare($query);

	// execute query

	$stmt->execute();
	return $stmt;
}

    public function FindCryptocurrency($name){
     $query =   "SELECT Trumpinys, `Pavadinimas`, `Kursas`
                 FROM  Kriptovaliuta
                 WHERE Kriptovaliuta.Pavadinimas = '$name'";
    $stmt = $this->conn->prepare($query);
	$stmt->execute();
	return $stmt;

    }


    /*

    public function GetCryptocurrencies(){
        $sql = "SELECT * 
                FROM Kriptovaliuta";

    }





    public function CompareCryptocurrences($lefttCurrency, $rightCurrency){
        $sql = "SELECT *
        FROM Kriptovaliuta
        WHERE Kriptovaliuta.Pavadinimas in ( $lefttCurrency, $rightCurrency ) ";


    }
*/
}

