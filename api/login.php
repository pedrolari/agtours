<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");
header ("Access-Control-Allow-Credentials: true");

    require_once 'include/DB_Functions.php';
    $db = new DB_Functions();

    // Array de respuesta JSON
    $response = array("error" => FALSE);
     
    if (isset($_POST['email']) && isset($_POST['password'])) {
     
        $email = $_POST['email'];
        $password = $_POST['password'];

        dd($email);
        $usuario = $db->getUserByEmailAndPassword($email, $password);
     
        if ($user != false) {
            // usuario encontrado
            $response["error"] = FALSE;
            $response["user"]["email"] = $usuario["email"];
            $response["user"]["password"] = $usuario["password"];
            echo json_encode($response);
        } else {
            // usuario no encontrado
            $response["error"] = TRUE;
            $response["error_msg"] = "Las credenciales de Login son incorrectas. Por favor intentalo de nuevo!";
            echo json_encode($response);
        }
    } else {
        // campos vacios 
        $response["error"] = TRUE;
        $response["error_msg"] = "Los parametros requeridos email y password son obligatorios!";
        echo json_encode($response);
    }
?>    