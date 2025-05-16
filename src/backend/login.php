<?php
require_once("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $contraseña = $_POST["contraseña"];

    try {
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($contraseña, $user["contraseña"])) {
            setcookie("user_id", $user["id"], time() + 3600, "/");
            echo json_encode(["success" => true, "message" => "Login exitoso"]);
        } else {
            echo json_encode(["success" => false, "message" => "Credenciales inválidas"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
?>
