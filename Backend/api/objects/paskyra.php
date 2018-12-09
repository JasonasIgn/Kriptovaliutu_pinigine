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
}