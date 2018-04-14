<?php
     /// CORS
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

    header("Content-Type: application/json");
    
    class DB_Functions {
     
        private $conn;
     
        function __construct() {
            require_once 'DB_Connect.php';
            $db = new Db_Connect();
            $this->conn = $db->connect();
        }
     
        function __destruct() {
             
        }

        /**
         * Comprueba si el usuario existe o no
         */
        public function isUserExisted($email) {
            $stmt = $this->conn->prepare("SELECT email_cli from clientes WHERE email_cli = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();
     
            if ($stmt->num_rows > 0) {
                // usuario existe 
                $stmt->close();
                return true;
            } else {
                // usuario no existe
                $stmt->close();
                return false;
            }
        }
     
        /**
        * Listado de Clientes
        *
        */
        public function listadoClientes() {
            $productos = array();

            $stmt = $this->conn->prepare("SELECT * from clientes");

            $stmt->execute();
            
            $result = $stmt->get_result();
            $stmt->close(); 

            // $producto = $result->fetch_assoc();

            while($pro = $result->fetch_assoc()){

                $productos[] = $pro;

            }
             echo json_encode(array('Clientes'=>$productos, JSON_PRETTY_PRINT));
 
        }

        /**
         *  Obtener usuario por email y password
         */
        public function getUserByEmailAndPassword($email, $password) {
     
            $stmt = $this->conn->prepare("SELECT * FROM clientes WHERE email = ? and password = ?");
     
            $stmt->bind_param("ss", $email, $password);
     
            if ($stmt->execute()) {
                $user = $stmt->get_result()->fetch_assoc();
                $stmt->close();
                return $user;
            } else {
                return NULL;
            }
        }

        /**
         * Storing new user
         * returns user details
         */
        public function storeUser($nombre, $apellidos, $direccion, $telefono, $email, $usuario, $password, $ciudad, $rol, $cp) {
    
            $stmt = $this->conn->prepare("INSERT INTO clientes (nom_cli, apell_cli, direc_cli, tel_cli, email_cli, usuario, password, id_ciudad, rol, cp_cliente) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $stmt->bind_param("sssssssiii", $nombre, $apellidos, $direccion, $telefono, $email, $usuario, $password, $ciudad, $rol, $cp);
            $result = $stmt->execute();
            $stmt->close();
     
            // check for successful store
            if ($result) {
                $stmt = $this->conn->prepare("SELECT * FROM clientes WHERE email_cli = ?");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $user = $stmt->get_result()->fetch_assoc();
                $stmt->close();
     
                return $user;
            } else {
                return false;
            }
        }
    }
?>

