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
	$paskyra->Id = $data->Id;
	$paskyra->Vardas = $data->Vardas;
	$paskyra->Pavarde = $data->Pavarde;
	$paskyra->Adresas = $data->Adresas;
	$paskyra->Tel_numeris = $data->Tel_numeris;
	$paskyra->Gimimo_data = $data->Gimimo_data;
	$paskyra->Lytis = $data->Lytis;
	$paskyra->Blokuota = $data->Blokuota;
	$paskyra->Teises = $data->Teises;
	$paskyra->fk_Sistemos_informacijaId = $data->fk_Sistemos_informacijaId;
 
	$code = $paskyra->updateForAdmin();
	// create the product
	if($code == 0){
		// set response code - 201 created
		http_response_code(201);
 
		echo json_encode(array("message" => "Informacija atnaujinta"));
		// tell the user
	}
	else {
 
		// set response code - 503 service unavailable
		http_response_code(200);
		echo json_encode(array("message" => $code));
	}
}
?>