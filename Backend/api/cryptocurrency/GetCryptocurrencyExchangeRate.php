<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/kriptovaliuta.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$krip = new Kriptovaliuta($db);

$currency = isset($_GET['currency']) ? $_GET['currency'] : die();


$stmt = $krip->GetCryptocurrencyExchangeRate($currency);
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
 
    // products array
    $crypto_arr=array();
    $crypto_arr["records"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $crypto_item=array(
            "Pavadinimas" => $Pavadinimas,
            "Kursas" => $Kursas,
        );
        array_push($crypto_arr["records"], $crypto_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
   echo  json_encode($crypto_arr);
}

?>