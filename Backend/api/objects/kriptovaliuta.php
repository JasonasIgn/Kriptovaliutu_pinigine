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
<<<<<<< HEAD:Backend/api/objects/Kriptovaliuta.php


    public function Getcryptocurrences(){
        $sql = "SELECT * 
                FROM Kriptovaliuta"

    //    $data = mysql::select($query);
    //    return 
    }

    public function GetcryptocurrencyExchangeRate(){
        $sql = "SELECT `Pavadinimas`, `Kursas`
                FROM Kriptovaliuta"
    }
}
=======
}
>>>>>>> 4b160a4135f2cc8fccdd6f2581e239f66af921c8:Backend/api/objects/kriptovaliuta.php
