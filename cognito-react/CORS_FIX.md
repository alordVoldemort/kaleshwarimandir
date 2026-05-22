# CORS Fix for Live Video Stream

## Problem
The live video stream at `http://localhost/cam_stream/cam_live.m3u8` is blocked by CORS policy when accessed from the React app running on `http://localhost:3000`.

## Solution
Add CORS headers to your web server that serves the video stream.

### For Apache (.htaccess)
```apache
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type"
```

### For Nginx
```nginx
location /cam_stream/ {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'Content-Type';
}
```

### For Node.js/Express
```javascript
app.use('/cam_stream', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

## Alternative Solutions

1. **Proxy in React**: Add to package.json:
```json
{
  "proxy": "http://localhost"
}
```

2. **Use the "Open in Browser" button** for direct access
3. **Use the "Fallback Mode" button** to try iframe embedding

## Current Status
- ✅ Video URL is accessible (200 OK)
- ❌ CORS headers missing
- ✅ HLS.js is working
- ✅ Fallback options available