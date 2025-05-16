<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));

if (isset($data->nombre) && isset($data->email) && isset($data->password)) {
    $nombre = $data->nombre;
    $email = $data->email;
    $passwordHash = password_hash($data->password, PASSWORD_BCRYPT);

    try {
        // Verificar si el email ya está registrado
        $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                "success" => false,
                "message" => "El email ya está registrado"
            ]);
            exit;
        }

        // Insertar nuevo usuario
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, contraseña) VALUES (:nombre, :email, :password)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $passwordHash);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Registro exitoso"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Error al registrar"
            ]);
        }

    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "message" => "Error de servidor: " . $e->getMessage()
        ]);
    }

} else {
    echo json_encode([
        "success" => false,
        "message" => "Faltan datos"
    ]);
}
?>
