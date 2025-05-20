<?php
session_start(); 

// cabeceras CORS necesarias para cookies cross-domain
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// verificamos si hay sesión activa
if (isset($_SESSION['usuario_id'])) {
    echo json_encode([
        "session" => [
            "usuario_id" => $_SESSION['usuario_id'],
            "usuario_nombre" => $_SESSION['usuario_nombre'],
            "usuario_email" => $_SESSION['usuario_email']
        ]
    ]);
} else {
    echo json_encode(["session" => null]);
}
?>
