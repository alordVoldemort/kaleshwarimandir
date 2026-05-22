<?php
// Show PHP errors for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Always set headers first
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight CORS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/config/db.php'; // $conn should be defined here

$uploadDir = "uploads/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST['name'] ?? '');
    $city = trim($_POST['city'] ?? '');
    $mobile = trim($_POST['mobile'] ?? '');

    // Validations
    if (empty($name) || empty($city) || empty($mobile)) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit;
    }

    if (!preg_match('/^\d{10}$/', $mobile)) {
        echo json_encode(["status" => "error", "message" => "Mobile number must be 10 digits."]);
        exit;
    }

    if (!isset($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(["status" => "error", "message" => "Image upload is required."]);
        exit;
    }

    $fileTmpPath = $_FILES['photo']['tmp_name'];
    $originalFileName = basename($_FILES['photo']['name']);
    $extension = strtolower(pathinfo($originalFileName, PATHINFO_EXTENSION));
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

    if (!in_array($extension, $allowedExtensions)) {
        echo json_encode(["status" => "error", "message" => "Only JPG, JPEG, PNG, and WEBP files are allowed."]);
        exit;
    }

    $fileName = uniqid('img_') . "." . $extension;
    $destPath = $uploadDir . $fileName;

    if (move_uploaded_file($fileTmpPath, $destPath)) {
        // Insert into database
        $stmt = $conn->prepare("INSERT INTO donations (name, city, mobile, image_path) VALUES (?, ?, ?, ?)");
        if ($stmt === false) {
            echo json_encode(["status" => "error", "message" => "SQL prepare failed: " . $conn->error]);
            exit;
        }

        $stmt->bind_param("ssss", $name, $city, $mobile, $destPath);

        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Donation submitted successfully!",
                "data" => [
                    "name" => $name,
                    "city" => $city,
                    "mobile" => $mobile,
                    "image_url" => $destPath
                ]
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database insert failed: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to upload image."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}

$conn->close();
