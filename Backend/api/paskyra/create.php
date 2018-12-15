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

include_once '../objects/pinigine.php';
 
$database = new Database();
$db = $database->getConnection();;
$paskyra = new Paskyra($db);
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
		!empty($data->Vardas) &&
		!empty($data->Pavarde) &&
		!empty($data->El_pastas) &&
		!empty($data->Slaptazodis)
	){
	 
		
		// set product property values
		$paskyra->Vardas = $data->Vardas;
		$paskyra->Pavarde = $data->Pavarde;
		$paskyra->El_pastas = $data->El_pastas;
		$paskyra->Slaptazodis = $data->Slaptazodis;
		$paskyra->Teises = 1;
		$paskyra->Blokuota = 0;
	 
		$code = $paskyra->create();
		// create the product
		if($code == 0){
			$code = $pinigine->create($paskyra->getId($paskyra->El_pastas));
			// set response code - 201 created
			http_response_code(201);
	 
			echo json_encode(array("message" => "Paskyra sukurta"));
			// tell the user
		}
		else {
	 
			// set response code - 503 service unavailable
			http_response_code(200);
			if ($code == 1062) echo json_encode(array("message" => "Toks el. pastas jau uzregistruotas"));
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