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
include_once '../objects/paskyra.php';
include_once '../objects/pinigine.php';
include_once '../objects/tokenas.php';
 
$database = new Database();
$db = $database->getConnection();;
$paskyra = new Paskyra($db);
$tokenas = new Tokenas($db);
$pinigine = new Pinigine($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     // The request is using the POST method
	 http_response_code(200);
	 
	 echo json_encode(array("msesage" => "Viskas ok"));
}
else {
// make sure data is not empty
	if(
		!empty($data->El_pastas) &&
		!empty($data->Slaptazodis)
	){
		// set product property values
		$paskyra->El_pastas = $data->El_pastas;
		$paskyra->Slaptazodis = $data->Slaptazodis;
	 
		$code = $paskyra->login();
		if ($code == 123) {	//Blokuota paskyra
			http_response_code(200);
			echo json_encode(array("message" => "Jūsų paskyra yra užblokuota"));
		}
		else {
			if($code){
			
				$token = $tokenas->createLogin($code['Teises'], $code['Id']);
				if ($token) {
					http_response_code(200);
					$piniginesInfo = $pinigine->getById($code['Id']);
					if ($piniginesInfo) {
						
						echo json_encode(array("token" => $token, "user" => $code, "wallet" => $piniginesInfo));
					}
					else {
						http_response_code(200);
						echo json_encode(array("message" => "Ivyko klaida gaunant pinigines info"));
					}
				}
				else {
					http_response_code(200);
					echo json_encode(array("message" => "Ivyko klaida gaunant token"));
				}
			
			}
			else {
				http_response_code(200);
				echo json_encode(array("message" => "Ivyko klaida gaunant vartotojo info"));
			}
		}
		// create the product
		
	}
	 
	// tell the user data is incomplete
	else {
	 
		// set response code - 400 bad request
		http_response_code(400);
	 
		// tell the user
		echo json_encode(array("code" => 400));
	}
}
?>