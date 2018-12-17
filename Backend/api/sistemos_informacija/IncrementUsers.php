<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/sistemos_informacija.php';
 
$database = new Database();
$db = $database->getConnection();;
$sistemos_informacija = new Sistemos_informacija($db);

$code = $sistemos_informacija->IncrementUsers();

http_response_code(200);

if ($code == 0) echo json_encode(array("message" => "Papildyta sekmingai"));
else echo json_encode(array("message" => $code));

?>