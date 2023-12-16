import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axiosCentral from './axiosHandler';

let api_base_url;
let access_token;

const LocalAgentDownload = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        access_token = localStorage.getItem('access_token');
        api_base_url = process.env.REACT_APP_BACKEND_URL;
      } catch (error) {
        console.error('Error fetching user options:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axiosCentral.post(
        `${api_base_url}/api/user/localAgentDownload`,
        {
          responseType: 'blob',
          headers: {
            'ngrok-skip-browser-warning': 'asd',
            Authorization: access_token,
          },
        }
      );

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      
      a.href = url;
      a.download = 'localAgent.exe';
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading local agent:', error);
    }
  };

  return (
    <div>
      <h2>Download Local Agent</h2>
      <div>
        <NavLink to="#" onClick={handleDownload}>
          Local Agent For Windows
        </NavLink>
      </div>
    </div>
  );
};

export default LocalAgentDownload;
