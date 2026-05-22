<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Stream URL
$streamUrl = 'http://82.112.226.74/cctv/live.m3u8';

// Get the file parameter if provided (for .ts segment files)
if (isset($_GET['file'])) {
    $file = basename($_GET['file']); // Sanitize filename
    $streamUrl = 'http://82.112.226.74/cctv/' . $file;
}

// Set appropriate content type
$extension = pathinfo($streamUrl, PATHINFO_EXTENSION);
if ($extension === 'm3u8') {
    header('Content-Type: application/vnd.apple.mpegurl');
} elseif ($extension === 'ts') {
    header('Content-Type: video/mp2t');
}

// Fetch and output the stream
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $streamUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch stream: ' . curl_error($ch)]);
} else {
    // For m3u8 files, rewrite segment URLs to go through proxy
    if ($extension === 'm3u8' && $response) {
        $lines = explode("\n", $response);
        $newLines = [];
        foreach ($lines as $line) {
            $line = trim($line);
            if (!empty($line) && !str_starts_with($line, '#')) {
                // This is a segment file, rewrite URL
                $newLines[] = 'stream_proxy.php?file=' . urlencode($line);
            } else {
                $newLines[] = $line;
            }
        }
        echo implode("\n", $newLines);
    } else {
        echo $response;
    }
}

curl_close($ch);
?>
