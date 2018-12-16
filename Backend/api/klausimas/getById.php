<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/klausimas.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$klausimas = new Klausimas($db);
 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     // The request is using the POST method
	 http_response_code(200);
	 
	 echo json_encode(array("msesage" => "Viskas ok"));
}
else {
	// check if more than 0 record found
	$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$code = $klausimas->getById(parse_url($url, PHP_URL_QUERY));
	
	if($code != null)
	{
		$klausimai = array();
		$i = 0;
		while($row = mysqli_fetch_assoc($code)) {
			http_response_code(200);
			$klausimai[$i++] = $row;
			
		}
		echo json_encode($klausimai);
	}
	else  echo json_encode(array("msesage" => "Įvyko klaida"));
}
 
// no products found will be here
