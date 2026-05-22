import React, { useState, useEffect, useRef } from "react";
import "./Addimg.css";

const AddImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const maxFileSizeMB = 5;

  const API_BASE = "https://kaleshwarimandirannadanchhatra.org/pooja-backend";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    setIsLoading(true);
    fetch(`${API_BASE}/getImages.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setImages(data.data);
        }
      })
      .catch((err) => console.error("Error fetching images:", err))
      .finally(() => setIsLoading(false));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadStatus("error:Please select a valid image file");
      resetFileInput();
      return;
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setUploadStatus(`error:File size exceeds ${maxFileSizeMB}MB limit`);
      resetFileInput();
      return;
    }

    setSelectedFile(file);
    setUploadStatus("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("error:Please select a file first");
      return;
    }

    setIsUploading(true);
    setUploadStatus("uploading");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch(`${API_BASE}/upload.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      if (data.success) {
        setUploadStatus("success:Image uploaded successfully!");
        resetFileInput();
        setImages(prev => [{ filename: data.filename }, ...prev]);
        setTimeout(() => setUploadStatus(""), 3000);
      } else {
        throw new Error(data.message || "Server rejected upload");
      }
    } catch (err) {
      setUploadStatus("error:" + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`${API_BASE}/deleteImage.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ filename })
      });

      const data = await res.json();
      if (data.success) {
        setImages(prev => prev.filter(img => img.filename !== filename));
        setUploadStatus("success:Image deleted successfully");
        setTimeout(() => setUploadStatus(""), 3000);
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (err) {
      setUploadStatus("error:Error deleting image - " + err.message);
    }
  };

  const resetFileInput = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getStatusMessage = () => {
    if (!uploadStatus) return null;

    const [type, message] = uploadStatus.split(":");
    
    if (type === "uploading") {
      return (
        <div className="status-message uploading">
          <div className="status-icon">
            <svg className="spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.4 31.4" />
            </svg>
          </div>
          <span>Uploading image...</span>
        </div>
      );
    }

    if (type === "success") {
      return (
        <div className="status-message success">
          <div className="status-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span>{message}</span>
        </div>
      );
    }

    if (type === "error") {
      return (
        <div className="status-message error">
          <div className="status-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <span>{message}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="gallery-container">
      {/* Upload Section */}
      <div className="upload-section">
        <div className="section-header">
          <h2>Upload New Image</h2>
          <p>Add images to your temple gallery</p>
        </div>

        <div
          className={`upload-area ${isDragging ? "dragging" : ""} ${selectedFile ? "has-file" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            disabled={isUploading}
            style={{ display: "none" }}
          />

          {!selectedFile ? (
            <div className="upload-placeholder">
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3>Drop your image here</h3>
              <p>or click to browse</p>
              <span className="file-format">PNG, JPG, GIF up to {maxFileSizeMB}MB</span>
            </div>
          ) : (
            <div className="file-preview">
              <div className="preview-image">
                <img src={previewUrl} alt="Preview" />
              </div>
              <div className="file-info">
                <div className="file-name">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedFile.name}
                </div>
                <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                <button
                  className="remove-file-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetFileInput();
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="upload-actions">
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? (
              <>
                <svg className="btn-spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.4 31.4" />
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Image
              </>
            )}
          </button>

          {selectedFile && !isUploading && (
            <button className="cancel-btn" onClick={resetFileInput}>
              Cancel
            </button>
          )}
        </div>

        {getStatusMessage()}
      </div>

      {/* Gallery Section */}
      <div className="gallery-section">
        <div className="section-header">
          <div>
            <h2>Gallery Images</h2>
            <p>{images.length} image{images.length !== 1 ? "s" : ""} in gallery</p>
          </div>
          <button className="refresh-btn" onClick={fetchImages} disabled={isLoading}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isLoading ? "spin" : ""}>
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <svg className="loading-spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.4 31.4" />
            </svg>
            <p>Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3>No images yet</h3>
            <p>Upload your first image to get started</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img, index) => (
              <div className="gallery-card" key={index}>
                <div className="gallery-image">
                  <img
                    src={`${API_BASE}/uploads/${img.filename}`}
                    alt={`Gallery ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <button
                      className="delete-image-btn"
                      onClick={() => handleDelete(img.filename)}
                      title="Delete image"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="gallery-info">
                  <span className="image-name" title={img.filename}>
                    {img.filename}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddImg;
