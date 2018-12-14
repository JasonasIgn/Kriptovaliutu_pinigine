<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/pinigine.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$pinigine = new Pinigine($db);
 
$pinigine->fk_PaskyraId = isset($_GET['Id']) ? $_GET['Id'] : die;
// query pinigine
$pinigine->readBalanse();

if($pinigine->fk_PaskyraId!=null){
    // create array
    $pinigine_arr = array(
        "fk_PaskyraId" => $pinigine->fk_PaskyraId,
        "Balansas_USD" => $pinigine->Balansas_USD,
        "Balansas_EUR" => $pinigine->Balansas_EUR
 
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($pinigine_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user product does not exist
    echo json_encode(array("message" => "Balanse does not exist."));
}
?>
