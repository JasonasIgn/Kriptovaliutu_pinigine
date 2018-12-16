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
 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     // The request is using the POST method
	 http_response_code(200);
	 
	 echo json_encode(array("msesage" => "Viskas ok"));
}
else {
	if(
		!empty($data->walletId) &&
		!empty($data->cryptoId)
	){
		$code = $pinigine_kriptovaliuta->getByTwoIds($data->walletId, $data->cryptoId);
		http_response_code(200);
		
		echo json_encode(array("data" => $code));
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Blogai uzpildyti duomenys"));
	}
}
?>