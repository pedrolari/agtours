<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");

    require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
     
    // json response array
    $response = array("error" => FALSE);
     
    if (isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['direccion']) && isset($_POST['telefono']) && isset($_POST['email']) && isset($_POST['user']) && isset($_POST['password']) && isset($_POST['cp'])) {

        // receiving the post params
        $nombre = $_POST['nombre'];
        $apellidos = $_POST['apellidos'];
        $direccion = $_POST['direccion'];
        $telefono = $_POST['telefono'];
        $email = $_POST['email'];
        $user = $_POST['user'];
        $password = $_POST['password'];
        $ciudad = "11741";
        $rol = "2";
        $cp = $_POST['cp'];

        // check if user is already existed with the same email
        if ($db->isUserExisted($email)) {
            // user already existed
            $response["error"] = TRUE;
            $response["error_msg"] = "Ya existe el usuario con email " . $email;
            echo json_encode($response);
        } else {
            // create a new user
            $user = $db->storeUser($nombre, $apellidos, $direccion, $telefono, $email, $user, $password, $ciudad, $rol, $cp);
            if ($user) {
                // user stored successfully
                $response["error"] = FALSE;
                $response["user"]["nombre"] = $user["nombre"];
                $response["user"]["apellidos"] = $user["apellidos"];
                $response["user"]["direccion"] = $user["direccion"];
                $response["user"]["telefono"] = $user["telefono"];
                $response["user"]["email"] = $user["email"];
                $response["user"]["user"] = $user["user"];
                $response["user"]["password"] = $user["password"];
                $response["user"]["idciudad"] = $user["idciudad"];
                $response["user"]["rol"] = $user["rol"];
                $response["user"]["cp"] = $user["cp"];
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