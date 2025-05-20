<?php
// Cabeceras necesarias
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Inicia la sesión si existe
session_start();

// Destruye la sesión
$_SESSION = [];
session_unset();
session_destroy();

// Borra cookies relacionadas
setcookie("usuario_id", "", time() - 3600, "/", "", false, true);
setcookie("usuario_nombre", "", time() - 3600, "/", "", false, true);
setcookie("usuario_email", "", time() - 3600, "/", "", false, true);

// Devuelve respuesta JSON
echo json_encode(["success" => true, "message" => "Sesión cerrada"]);
?>
