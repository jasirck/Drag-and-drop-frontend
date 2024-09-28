import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import './Text.css'; 

const fileTypes = ["TXT"];

function Text({ setImportModal }) {

  const [loading, setLoading] = useState(false);  // State for loading

  const handleChange = (selectedFile) => {
    if (selectedFile) {
      setLoading(true);  // Start loading when a file is selected
  
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
        setLoading(false);  // Stop loading after successful upload
        setImportModal(false);  // Close modal
      })
      .catch(error => {
        console.error(error);
        setLoading(false);  // Stop loading on error
        setImportModal(false); 
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="upload-container">
        <h2>Upload Your Text File</h2>
        <button onClick={() => setImportModal(false)} className="close-button">
          &times;
        </button>

        {loading ? (  // Show loading spinner if loading is true
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Uploading...</p>
          </div>
        ) : (
          <FileUploader 
            handleChange={handleChange} 
            name="file" 
            types={fileTypes} 
            className="file-uploader"
          />
        )}
      </div>
    </div>
  );
}

export default Text;
