<?php
class Pinigine{
 
    // database connection and table name
    private $conn;
    private $table_name = "Pinigine";
 
 

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
}
?>