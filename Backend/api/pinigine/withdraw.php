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
		$code = $pinigine->widthdrawBalance($data->Id, $data->Suma);
		http_response_code(200);
		
		if ($code == 1000) {
			echo json_encode(array("message" => "Balanse nepakanka lėšų"));
		}
		else if ($code == 0) {
			echo json_encode(array("message" => "Sėkmingai išgryninta"));
		}
		else {
			echo json_encode(array("message" => $code));
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