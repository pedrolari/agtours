<?php
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");
header ("Access-Control-Allow-Credentials: true");

    require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
     
    // json response array
    $response = array("error" => FALSE);
     
    if (isset($_POST['emailreg']) && isset($_POST['passwordreg'])) {
     
        // receiving the post params
        $email = $_POST['emailreg'];
        $password = $_POST['passwordreg'];
     
        // check if user is already existed with the same email
        if ($db->isUserExisted($email)) {
            // user already existed
            $response["error"] = TRUE;
            $response["error_msg"] = "Ya existe el usuario con email " . $email;
            echo json_encode($response);
        } else {
            // create a new user
            $user = $db->storeUser($email, $password);
            if ($user) {
                // user stored successfully
                $response["error"] = FALSE;
                // $response["uid"] = $user["unique_id"];
                $response["user"]["email"] = $user["email"];
                $response["user"]["password"] = $user["password"];
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