import React, { useState, useEffect } from 'react';
import axiosCentral from './axiosHandler';
import { decodeToken } from './TokenHandler';
import './comNet.css';

let api_base_url;
let access_token;
let refresh_token;

const ComNetPage = () => {
  const [user_id, setUserId] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('');

  const fetchData = async () => {
    try {
      access_token = localStorage.getItem('access_token');
      refresh_token = localStorage.getItem('refresh_token');
      api_base_url = process.env.REACT_APP_BACKEND_URL;

      const decoded = decodeToken(access_token);
      setUserId(decoded.user_id);

      const response = await axiosCentral.get(`${api_base_url}/api/user/getSubWarning`, {
        headers: {
          'ngrok-skip-browser-warning': 'asd'
        }
      });
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSub = async () => {
    try {
      await axiosCentral.post(`${api_base_url}/api/user/createSub`, {
        displayname: displayname,
        sub_user_email: email
      },{
        headers: {
          'ngrok-skip-browser-warning': 'asd'
        }
      });
      setPopupVisible(false);
      setDisplayname('');
      setEmail('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSub = async (user_id) => {
    try {
      await axiosCentral.delete(`${api_base_url}/api/user/deleteUser/${user_id}`,{
        headers: {
          'ngrok-skip-browser-warning': 'asd'
        }
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={() => setPopupVisible(true)}>+ Sub-User</button>

      {isPopupVisible && (
        <div className="overlay">
          <div className="comnetpopup">
            <h3>Create Sub-User</h3>
            <div>
              <input
                type="text"
                placeholder="Display Name"
                className='comnetinput'
                value={displayname}
                onChange={(e) => setDisplayname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Sub-User Email"
                className='comnetinput'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button className='comnetbutton' onClick={handleCreateSub}>Create Sub-User</button>
              <button className='comnetbutton' onClick={() => setPopupVisible(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <h2>Computer Network Management</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.user_id}>
                {item.user_id === user_id ? (
                  <td>{item.user_id} (MAIN)</td>
                ) : (
                  <td>{item.user_id}<div><button style={{width: '94%'}} onClick={() => handleDeleteSub(item.user_id)}>Delete</button></div></td>
                )}
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
