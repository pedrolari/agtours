<?php
	/// CORS
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
	header("Content-Type: application/json");

    require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
    $db->listadoClientes();
?>    