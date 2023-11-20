import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from './TokenHandler';
import './comNet.css'

let api_base_url 
let access_token 
let refresh_token 

const ComNetPage = () => {
  const [user_id, setUserId] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        access_token = localStorage.getItem('access_token');
        refresh_token = localStorage.getItem('refresh_token');
        api_base_url = process.env.REACT_APP_BACKEND_URL;

        const decodedToken = decodeToken(access_token);
        setUserId(decodedToken.user_id);

        const response = await axios.get(`${api_base_url}/api/user/getSubWarning`, {
          headers: {
            'Authorization': access_token,
            'ngrok-skip-browser-warning': 'asd'
          }
        });
        console.log(response.data)

        setItems(response.data.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h2>Computer Network Management</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sub-user ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.user_id}>
                <td>{item.user_id}</td>
                <td>{item.displayname}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComNetPage;