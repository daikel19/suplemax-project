<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    try {
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($password, $usuario['contraseña'])) {
            echo json_encode([
                "success" => true,
                "usuario" => [
                    "id" => $usuario["id"],
                    "nombre" => $usuario["nombre"],
                    "email" => $usuario["email"],
                    "rol" => $usuario["rol"]
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Credenciales inválidas"]);
        }

    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error de conexión: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Faltan datos"]);
}
?>
