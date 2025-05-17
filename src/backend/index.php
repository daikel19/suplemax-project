<?php

require 'routes.php';

$requestUri = $_SERVER['REQUEST_URI'];

if (isset($routes[$requestUri])) {
    require $routes[$requestUri];
    exit();
}

// Si no se encuentra la ruta
http_response_code(404);
echo json_encode(["error" => "Ruta no encontrada"]);

?>