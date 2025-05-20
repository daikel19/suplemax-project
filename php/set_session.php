<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["success" => false, "message" => "Datos inválidos"]);
  exit;
}

// Cookies válidas 7 días
$expira = time() + (86400 * 7);

setcookie("usuario_id", $data["usuario_id"], $expira, "/", "", false, true);
setcookie("usuario_nombre", $data["usuario_nombre"], $expira, "/", "", false, true);
setcookie("usuario_email", $data["usuario_email"], $expira, "/", "", false, true);

echo json_encode(["success" => true]);
?>
