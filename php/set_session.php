<?php

session_start();
header("Access-Control-Allow-Origin: *"); // solo para desarrollo (no pienso usar mas nunca php)
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


ini_set('session.cookie_samesite', 'Lax');
ini_set('session.cookie_secure', '0');

$input = json_decode(file_get_contents("php://input"), true);

if (is_array($input) && isset($input['usuario_id'], $input['usuario_nombre'], $input['usuario_email'])) {
    $_SESSION['usuario_id'] = $input['usuario_id'];
    $_SESSION['usuario_nombre'] = $input['usuario_nombre'];
    $_SESSION['usuario_email'] = $input['usuario_email'];

    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
}
?>
