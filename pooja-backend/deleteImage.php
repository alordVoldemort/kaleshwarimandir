<?php
require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/cors.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['filename'])) {
    echo json_encode(['success' => false, 'message' => 'Filename missing']);
    exit;
}

$filename = basename($data['filename']); // Secure against path traversal
$filePath = __DIR__ . "/uploads/" . $filename;

try {
    // Delete from DB
    $stmt = $pdo->prepare("DELETE FROM gallery_images WHERE filename = :filename");
    $stmt->execute([':filename' => $filename]);

    // If deleted from DB, delete file from folder
    if ($stmt->rowCount() > 0) {
        if (file_exists($filePath)) {
            unlink($filePath);
        }
        echo json_encode(['success' => true, 'message' => 'Image deleted']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Image not found in database']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error deleting image', 'error' => $e->getMessage()]);
}
