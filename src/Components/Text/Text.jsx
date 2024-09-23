import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import './Text.css'; // Import the CSS for styling

const fileTypes = ["TXT", "text/plain"];

function Text({ setImportModal }) {
  const [file, setFile] = useState(null);

  const handleChange = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(response => {
        console.log(response.data);
        setFile(null); // Clear the file input
        setImportModal(false); // Hide the modal after upload
      })
      .catch(error => {
        console.error(error);
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
        <FileUploader 
          handleChange={handleChange} 
          name="file" 
          types={fileTypes} 
          className="file-uploader"
        />
      </div>
    </div>
  );
}

export default Text;
