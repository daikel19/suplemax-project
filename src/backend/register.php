<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Leer el cuerpo de la petición
$raw = file_get_contents("php://input");

// Intentar decodificar JSON
$data = json_decode($raw, true);

if (!$data) {
    // Si no se pudo leer JSON, tal vez vino como form-urlencoded
    $data = $_POST;

    if (!$data || !isset($data['nombre']) || !isset($data['email']) || !isset($data['password'])) {
        echo json_encode([
            "success" => false,
            "message" => "No se pudo leer el JSON ni POST válido",
            "raw" => $raw,
        ]);
        exit;
    }
}

// Verificar que estén todos los datos
if (!isset($data['nombre'], $data['email'], $data['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Faltan datos",
        "raw" => $raw,
    ]);
    exit;
}

$nombre = $data['nombre'];
$email = $data['email'];
$passwordHash = password_hash($data['password'], PASSWORD_BCRYPT);

try {
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => false,
            "message" => "El correo ya está registrado",
        ]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password, rol, fecha_registro) VALUES (:nombre, :email, :password, 'cliente', NOW())");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $passwordHash);
    $stmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "Usuario registrado correctamente",
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error en el servidor: " . $e->getMessage(),
    ]);
}
