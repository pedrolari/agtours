<?php
// header ("Access-Control-Allow-Origin: *");
// header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
// header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
// header ("Access-Control-Allow-Headers: *");
// header ("Access-Control-Allow-Credentials: true");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Content-Type: application/json");

    require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
     
    // json response array
    $response = array("error" => FALSE);
     
    if (isset($_POST['email_cli']) && isset($_POST['password']) && isset($_POST['id_ciudad']) && isset($_POST['rol'])) {
     
        // receiving the post params
        $email = $_POST['email_cli'];
        $password = $_POST['password'];
        $ciudad = $_POST['id_ciudad'];
        $rol = $_POST['rol'];
     
        // check if user is already existed with the same email
        if ($db->isUserExisted($email)) {
            // user already existed
            $response["error"] = TRUE;
            $response["error_msg"] = "Ya existe el usuario con email " . $email;
            echo json_encode($response);
        } else {
            // create a new user
            $user = $db->storeUser($email, $password, $ciudad, $rol);
            if ($user) {
                // user stored successfully
                $response["error"] = FALSE;
                // $response["uid"] = $user["unique_id"];
                $response["user"]["email_cli"] = $user["email_cli"];
                $response["user"]["password"] = $user["password"];
                $response["user"]["id_ciudad"] = $user["id_ciudad"];
                $response["user"]["rol"] = $user["rol"];
                echo json_encode($response);
            } else {
                // user failed to store
                $response["error"] = TRUE;
                $response["error_msg"] = "Ocurrio un error en el registro!";
                echo json_encode($response);
            }
        }
    } else {
        $response["error"] = TRUE;
        $response["error_msg"] = "Alguno de los campos no esta rellenado!";
        echo json_encode($response);
    }
?>