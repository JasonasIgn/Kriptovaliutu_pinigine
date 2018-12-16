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
 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     // The request is using the POST method
	 http_response_code(200);
	 
	 echo json_encode(array("msesage" => "Viskas ok"));
}
else {
	$code = $paskyra->getAll();
	
	if($code != null)
	{
		$paskyros = array();
		$i = 0;
		while($row = mysqli_fetch_assoc($code)) {
			http_response_code(200);
			$paskyros[$i++] = $row;
			
		}
		echo json_encode($paskyros);
	}
	else  echo json_encode(array("msesage" => "Įvyko klaida"));
	/*http_response_code(200);
	if ($code != null) echo json_encode(array("paskyra" => $code));
	else echo json_encode(array("message" => "Ivyko klaida"));*/

}
 
// no products found will be here
?>