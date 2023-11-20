import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from './TokenHandler';
import './userApp.css'

let api_base_url 
let access_token 
let refresh_token 

const UserAppPage = () => {
  const [user_id, setUserId] = useState('');
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserOptions = async () => {
      try {
        access_token = localStorage.getItem('access_token');
        api_base_url = process.env.REACT_APP_BACKEND_URL;

        const decodedToken = await decodeToken(access_token);
        setUserId(decodedToken.user_id);

        const response = await axios.get(`${api_base_url}/api/user/getSub`, {
          headers: {
            'Authorization': access_token,
            'ngrok-skip-browser-warning': 'asd'
          }
        });

        setUserOptions(response.data.data);
        setSelectedUserId(decodedToken.user_id);

      } catch (error) {
        console.error('Error fetching user options:', error);
      }
    };

    fetchUserOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${api_base_url}/api/user/checkPatch/${selectedUserId}`, {
          headers: {
            'Authorization': access_token,
            'ngrok-skip-browser-warning': 'asd'
          }
        }).then(response => {
          setItems(response.data.data);
        }).catch(err => {
          setItems([{
            DisplayName: 'Have not upload yet',
            DisplayVersion: 'Have not upload yet'
          }])
        })    

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedUserId]);


  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  return (
    <div>
      <h2>User App</h2>

      <label htmlFor="userDropdown">Select User:  </label>
      <select id="userDropdown" value={selectedUserId} onChange={handleUserChange}>

        <option key={user_id} value={user_id}>Main</option>

        {userOptions.map((sub) => (
          <option key={sub.user_id} value={sub.user_id}>
            {sub.displayname}
          </option>
        ))}
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Version</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index + 1}>
                <td>{item.DisplayName}</td>
                <td>{item.DisplayVersion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAppPage;