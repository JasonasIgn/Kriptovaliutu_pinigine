<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/paskyra.php';
 
$database = new Database();
$db = $database->getConnection();
 
$paskyra = new Paskyra($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->vardas) &&
    !empty($data->pavarde) &&
    !empty($data->el_pastas) &&
    !empty($data->slaptazodis)
){
 
    // set product property values
    $paskyra->vardas = $data->vardas;
    $paskyra->pavarde = $data->pavarde;
    $paskyra->el_pastas = $data->el_pastas;
    $paskyra->slaptazodis = $data->slaptazodis;
 
    // create the product
    if($paskyra->create()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "Paskyra was created."));
    }
 
    // if unable to create the product, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create paskyra."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create paskyra. Data is incomplete."));
}
?>