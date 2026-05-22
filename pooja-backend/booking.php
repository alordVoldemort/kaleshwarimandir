<?php
// Enable error reporting for debugging (remove in production)
require_once __DIR__ . '/config/cors.php'; // Include CORS headers first

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// DB connection
require __DIR__ . '/config/db.php';

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (
    isset($data['name']) && isset($data['number']) && isset($data['date']) &&
    isset($data['time']) && isset($data['address']) && isset($data['pooja']) && isset($data['cost'])
) {
    try {
        // Prepare SQL
        $stmt = $pdo->prepare("INSERT INTO bookings (name, number, date, time, address, pooja, cost, status, timestamp)
                               VALUES (:name, :number, :date, :time, :address, :pooja, :cost, 'pending', NOW())");

        // Execute
        $stmt->execute([
            ':name'    => $data['name'],
            ':number'  => $data['number'],
            ':date'    => $data['date'],
            ':time'    => $data['time'],
            ':address' => $data['address'],
            ':pooja'   => $data['pooja'],
            ':cost'    => $data['cost']
        ]);

        // Success response
        echo json_encode([
            'success' => true,
            'message' => 'Booking saved successfully'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database query error',
            'error' => $e->getMessage() // Remove this on production
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields'
    ]);
}
