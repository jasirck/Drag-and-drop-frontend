import React, { useEffect, useState } from 'react';
import Text from '../Text/Text';
import axios from 'axios';
import './Urls.css';

const Urls = () => {
  const [importModal, setImportModal] = useState(false);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUrls = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get("http://127.0.0.1:8000/urls/");
      setUrls(response.data);
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setError("Error fetching URLs. Please try again later.");
    } finally {
      setLoading(false);
      console.log(urls);
      
    }
  };
  const clear = () => {
    axios.delete("http://127.0.0.1:8000/clear/")
      .then((response) => {
        console.log(response.data.message);
        fetchUrls(); 
      })
      .catch((error) => {
        console.error("Error clearing URLs:", error);
      });
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
          <button onClick={clear} className="button clear">
            <span className="icon"></span> Clear
          </button>
        </div>
      </div>

      {importModal && <Text setImportModal={setImportModal} />}

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="urls-table-container">
          <table className="urls-table">
            <thead>
              <tr>
                <th>#</th>
                <th>URLs</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
  {urls.length === 0 ? (
    <tr>
      <td colSpan={3} className="empty-cell">
        No URLs found. Click 'Upload' to add some!
      </td>
    </tr>
  ) : (
    urls.map((url, index) => (
      <tr key={url.id}>
        <td>{index + 1}</td>
        <td>
          <a href={url.urls} target="_blank" rel="noopener noreferrer">
            {url.urls}
          </a>
        </td>
        <td className="content-column">
          {url.content ? url.content : "No Content"}
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default Urls;
