    <?php
require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/db.php';

header("Content-Type: application/json");

try {
    $stmt = $pdo->query("SELECT * FROM bookings ORDER BY timestamp DESC");
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $bookings
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching data",
        "error" => $e->getMessage()
    ]);
}
