<?php
// login.php

// CORS headers
require_once __DIR__ . '/config/cors.php';

// Enable error reporting for debugging (disable in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Response headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection (PDO)
require_once __DIR__ . '/config/db.php';

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check required fields
if (isset($data['username']) && isset($data['password'])) {
    $username = $data['username'];
    $password = $data['password'];

    try {
        // Prepare and execute query
        $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = :username AND password = :password");
        $stmt->execute([
            ':username' => $username,
            ':password' => $password
        ]);

        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin) {
            echo json_encode([
                'success' => true,
                'message' => 'Login successful'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid username or password'
            ]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database error',
            'error' => $e->getMessage() // Remove in production
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Username and password are required'
    ]);
}
