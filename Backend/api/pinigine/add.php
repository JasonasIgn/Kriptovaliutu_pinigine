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
include_once '../objects/pinigine.php';
 
$database = new Database();
$db = $database->getConnection();
 
$pinigine = new Pinigine($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     // The request is using the POST method
	 http_response_code(200);
	 
	 echo json_encode(array("msesage" => "Viskas ok"));
}
else {
	if(
		!empty($data->Id) &&
		!empty($data->Suma)
	){
		$code = $pinigine->addToBalance($data->Id, $data->Suma);
		// create the product
		if($code == 0){
	 
			// set response code - 201 created
			http_response_code(200);
	 
			// tell the user
			echo json_encode(array("message" => "Sekmingai papildyta"));
		}
	 
		// if unable to create the product, tell the user
		else{
	 
			// set response code - 503 service unavailable
			http_response_code(200);
	 
			// tell the user
			echo json_encode(array("message" => "Ivyko klaida"));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(400);
	 
		// tell the user
		echo json_encode(array("message" => "Blogai uzpildyti duomenys"));
	}
}
?>