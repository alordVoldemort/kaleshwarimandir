<?php
require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/db.php';

header("Content-Type: application/json");

try {
    if (!isset($_FILES['image'])) {
        throw new Exception("No image uploaded");
    }

    $file = $_FILES['image'];
    $uploadDir = __DIR__ . '/uploads/';
    $publicPath = 'uploads/';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $filename = time() . '_' . basename($file['name']);
    $targetFile = $uploadDir . $filename;

    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $allowedTypes = ['jpg', 'jpeg', 'png', 'webp'];

    if (!in_array($fileType, $allowedTypes)) {
        throw new Exception("Only JPG, PNG, JPEG, and WEBP are allowed.");
    }

    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        // Insert filename into DB
        $stmt = $pdo->prepare("INSERT INTO gallery_images (filename) VALUES (:filename)");
        $stmt->execute(['filename' => $filename]);

        echo json_encode([
            "success" => true,
            "message" => "Image uploaded successfully",
            "filename" => $filename,
            "url" => $publicPath . $filename
        ]);
    } else {
        throw new Exception("Failed to move uploaded file.");
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
