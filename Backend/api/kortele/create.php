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
include_once '../objects/kortele.php';
 
$database = new Database();
$db = $database->getConnection();;
$kortele = new Kortele($db);
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
		!empty($data->Numeris) &&
		!empty($data->Kodas) &&
		!empty($data->fk_pinigineId) &&
		!empty($data->Galioja_iki)
	){
		// set product property values
		$kortele->Numeris = $data->Numeris;
		$kortele->Kodas = $data->Kodas;
		$kortele->fk_pinigineId = $data->fk_pinigineId;
		$kortele->Galioja_iki = $data->Galioja_iki;
	 
		$code = $kortele->create();
		// create the product
		if($code == 0){
			// set response code - 201 created
			http_response_code(201);
	 
			echo json_encode(array("message" => "Kortele prideta"));
		}
		else {
	 
			// set response code - 503 service unavailable
			http_response_code(200);
			if ($code == 1062) echo json_encode(array("message" => "Tokia kortele jau uzregistruota"));
			else echo json_encode(array("message" => $code));
		}
	}
	 
	// tell the user data is incomplete
	else {
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Ne visi duomenys uzpildyti"));
	}
}
?>