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
        * Listado de Clientes
        *
        */
        public function listadoClientes($idcliente) {
            $productos = array();

            $stmt = $this->conn->prepare("SELECT * from clientes where idcliente = ?");
            $stmt->bind_param("i", $idcliente);
            $stmt->execute();
            
            $result = $stmt->get_result();
            $stmt->close(); 

            // $producto = $result->fetch_assoc();

            while($pro = $result->fetch_assoc()){

                $productos[] = $pro;

            }
             echo json_encode(array('productos'=>$productos, JSON_PRETTY_PRINT));
 
        }

    }
?>

