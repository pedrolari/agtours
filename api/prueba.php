<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("mysql377int.srv-hostalia.com", "u5523880_agtours", "AGtours2018", "db5523880_agtours");

$result = $conn->query("SELECT * FROM clientes");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Nombre":"'  . $rs["nom_cli"] . '",';
    $outp .= '"email":"'   . $rs["email_cli"]        . '",';
    $outp .= '"password":"'. $rs["password"]     . '"}';
}
$outp ='{"resultados":['.$outp.']}';
$conn->close();

echo($outp);
?>
