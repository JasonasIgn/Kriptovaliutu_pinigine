<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/pinigine_kriptovaliuta.php';
 
$database = new Database();
$db = $database->getConnection();
 
$pinigine_kriptovaliuta = new Pinigine_kriptovaliuta($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$code = $pinigine_kriptovaliuta->getById(parse_url($url, PHP_URL_QUERY));

http_response_code(200);

echo json_encode(array("kriptovaliutos" => $code));
?>