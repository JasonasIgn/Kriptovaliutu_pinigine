<?php
class Transakcija{
 
    // database connection and table name
    private $conn;
    private $table_name = "Pinigine";
 
 

    public $Id;
    public $Siunciamas_kiekis;
    public $Sukurimo_data;
    public $Kriptovaliutos_id;
    public $Gavejo_adresas;
    public $Pranesimas;
    public $Perziureta_gavejo;
    public $fk_PinigineId;
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
}
?>