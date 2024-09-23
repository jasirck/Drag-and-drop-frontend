import React, { useEffect, useState } from 'react';
import Text from '../Text/Text';
import axios from 'axios';
import './Urls.css';

const Urls = () => {
  const [importModal, setImportModal] = useState(false);
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Count, setCount] = useState(0);

  const fetchUrls = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/urls/");
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [importModal]);

  return (
    <div className="urls-container">
      <div className="urls-header">
        <h1>URL Manager</h1>
        <div className="button-group">
          <button onClick={() => setImportModal(true)} className="button primary">
            <span className="icon">+</span> Upload
          </button>
          <button onClick={fetchUrls} className="button secondary">
            <span className="icon">↻</span> Refresh
          </button>
        </div>
      </div>
      
      {importModal && <Text setImportModal={setImportModal} />}
      
      <div className="urls-table-container">
        <table className="urls-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2} className="loading-cell">
                  <div className="loading-spinner"></div>
                  Loading...
                </td>
              </tr>
            ) : urls.length === 0 ? (
              <tr>
                <td colSpan={2} className="empty-cell">
                  No URLs found. Click 'Upload' to add some!
                </td>
              </tr>
            ) : (
              urls.map((url,index) => (
                <tr key={url.id}>
                  <td >{index + 1}</td>
                  <td>
                    <a href={url.urls} >{url.urls}</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Urls;