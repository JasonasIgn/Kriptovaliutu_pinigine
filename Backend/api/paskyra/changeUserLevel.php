<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/paskyra.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$paskyra = new Paskyra($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // The request is using the POST method
    http_response_code(200);
    
    echo json_encode(array("msesage" => "Viskas ok"));
}
else {
    if(
		!empty($data->Id) &&
		!empty($data->Teises)
    ){
        
        $code = $paskyra->changeUserLevel($data->Id, $data->Teises);

        if($code == 0){
			// set response code - 201 created
			http_response_code(201);
	 
			echo json_encode(array("message" => "Paskyros teisės pakeistos"));
			// tell the user
		}
		else {
	 
			// set response code - 503 service unavailable
			http_response_code(200);
			if ($code == 1062) echo json_encode(array("message" => "Įvyko klaida"));
			else echo json_encode(array("message" => $code));
		}
    }
    else {
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Ne visi duomenys uzpildyti"));
	}
}
 
// no products found will be here
?>