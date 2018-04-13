<?php
 
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
            $stmt = $this->conn->prepare("SELECT email from clientes WHERE email = ?");
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
        public function storeUser($email, $password) {
            // $uuid = uniqid('', true);
            // $hash = $this->hashSSHA($password);
            // $encrypted_password = $hash["encrypted"]; // encrypted password
            // $salt = $hash["salt"]; // salt
     
            $stmt = $this->conn->prepare("INSERT INTO clientes(email_cli, password) VALUES(?, ?)");
            $stmt->bind_param("ss", $email, $password);
            $result = $stmt->execute();
            $stmt->close();
     
            // check for successful store
            if ($result) {
                $stmt = $this->conn->prepare("SELECT * FROM clientes WHERE email = ?");
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

