<?php
    require_once 'include/DB_Functions.php';
    $db = new DB_Functions();
     
    // json response array
    $response = array("error" => FALSE);
     
    if (isset($_POST['nom_cli']) && isset($_POST['apell_cli']) && isset($_POST['direc_cli']) && isset($_POST['tel_cli']) && isset($_POST['email_cli']) && isset($_POST['usuario']) && isset($_POST['password']) && isset($_POST['id_ciudad']) && isset($_POST['rol']) && isset($_POST['cp_cliente'])) {
     
        // receiving the post params
        $nombre = $_POST['nom_cli'];
        $apellidos = $_POST['apell_cli'];
        $direccion = $_POST['direc_cli'];
        $telefono = $_POST['tel_cli'];
        $email = $_POST['email_cli'];
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];
        $ciudad = $_POST['id_ciudad'];
        $rol = $_POST['rol'];
        $cp = $_POST['cp_cliente'];

        // check if user is already existed with the same email
        if ($db->isUserExisted($email)) {
            // user already existed
            $response["error"] = TRUE;
            $response["error_msg"] = "Ya existe el usuario con email " . $email;
            echo json_encode($response);
        } else {
            // create a new user
            $user = $db->storeUser($nombre, $apellidos, $direccion, $telefono, $email, $usuario, $password, $ciudad, $rol, $cp);
            if ($user) {
                // user stored successfully
                $response["error"] = FALSE;
                $response["user"]["nom_cli"] = $user["nom_cli"];
                $response["user"]["apell_cli"] = $user["apell_cli"];
                $response["user"]["direc_cli"] = $user["direc_cli"];
                $response["user"]["tel_cli"] = $user["tel_cli"];
                $response["user"]["email_cli"] = $user["email_cli"];
                $response["user"]["usuario"] = $user["usuario"];
                $response["user"]["password"] = $user["password"];
                $response["user"]["id_ciudad"] = $user["id_ciudad"];
                $response["user"]["rol"] = $user["rol"];
                $response["user"]["cp_cliente"] = $user["cp_cliente"];
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