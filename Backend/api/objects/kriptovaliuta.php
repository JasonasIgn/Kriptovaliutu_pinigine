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
<<<<<<< HEAD
=======

>>>>>>> 5e8b3adca75d92d7a9cdcd3479d66f0b94db477a


    public function Getcryptocurrences(){
        $sql = "SELECT * 
                FROM Kriptovaliuta";

    }

    public function GetcryptocurrencyExchangeRate(){
        $sql = "SELECT `Pavadinimas`, `Kursas`
                FROM Kriptovaliuta";
    }

    public function FindCryptocurrency($name){
        $sql = "SELECT *
                FROM Kriptovaliuta
                WHERE Kriptovaliuta.Pavadinimas = $name;

    }





}
<<<<<<< HEAD
}
=======

}

>>>>>>> 5e8b3adca75d92d7a9cdcd3479d66f0b94db477a
