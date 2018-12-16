<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST,OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/paskyra.php';

 
$database = new Database();
$db = $database->getConnection();;
$paskyra = new Paskyra($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     // The request is using the POST method
	 http_response_code(200);
	 
	 echo json_encode(array("msesage" => "Viskas ok"));
}
else { 
	$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$code = $paskyra->getById(parse_url($url, PHP_URL_QUERY));

	http_response_code(200);
	if ($code != null) echo json_encode(array("user" => $code));
	else echo json_encode(array("message" => "Ivyko klaida"));
}
?>