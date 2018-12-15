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
 
 
include_once '../objects/tokenas.php';
 
$database = new Database();
$db = $database->getConnection();;
$paskyra = new Paskyra($db);
$tokenas = new Tokenas($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// make sure data is not empty
if(
    !empty($data->El_pastas) &&
    !empty($data->Slaptazodis)
){
    // set product property values
    $paskyra->El_pastas = $data->El_pastas;
    $paskyra->Slaptazodis = $data->Slaptazodis;
 
	$code = $paskyra->login();
    // create the product
    if($code){
		
		$token = $tokenas->createLogin($code['Teises'], $code['Id']);
		if ($token) {
			http_response_code(200);
		
        // tell the user
			echo json_encode(array("token" => $token, "user" => $code));
		}
		else {
			http_response_code(400);
		}
        
    }
	else {
        http_response_code(400);
    }
}
 
// tell the user data is incomplete
else {
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("code" => 400));
}
?>