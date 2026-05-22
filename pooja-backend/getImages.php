<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Images directory
$uploadDir = __DIR__ . '/uploads/';
$images = [];

foreach (scandir($uploadDir) as $file) {
    if (in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'webp'])) {
        $images[] = ['filename' => $file];
    }
}

echo json_encode([
    "success" => true,
    "data" => array_reverse($images) // newest first
]);
