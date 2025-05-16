<?php
require_once("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $contraseña = password_hash($_POST["contraseña"], PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)");
        $stmt->execute([$nombre, $email, $contraseña]);

        echo json_encode(["success" => true, "message" => "Usuario registrado correctamente"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
?>
