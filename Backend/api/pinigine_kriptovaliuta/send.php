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
include_once '../objects/pinigine_kriptovaliuta.php';
 
$database = new Database();
$db = $database->getConnection();
 
$pinigine_kriptovaliuta = new Pinigine_kriptovaliuta($db);
 
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
		!empty($data->sendValue) &&
		(!empty($data->sendId) || $data->sendId == 0) &&
		!empty($data->receiverAddress) &&
		(!empty($data->ownerWalletId) || $data->ownerWalletId == 0)
	){
		$code = $pinigine_kriptovaliuta->Send($data->sendValue, $data->sendId, $data->receiverAddress, $data->ownerWalletId);
		// create the product
		if($code == 0){
	 
			// set response code - 201 created
			http_response_code(200);
	 
			// tell the user
			echo json_encode(array("message" => "Išsiųsta sėkmingai"));
		}
	 
		// if unable to create the product, tell the user
		else{
	 
			// set response code - 503 service unavailable
			http_response_code(200);
			if ($code == 999) echo json_encode(array("message" => "Nera tokios pinigines"));
			else echo json_encode(array("message" => $code));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Data is incomplete"));
	}
}
?>