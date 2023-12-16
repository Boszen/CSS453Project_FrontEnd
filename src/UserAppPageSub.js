import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axiosCentral from './axiosHandler';
import { decodeToken } from './TokenHandler';
import './userApp.css'

let api_base_url 
let access_token 
let refresh_token 

const UserAppPageSub = () => {
  const [user_id, setUserId] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupFix, setPopupFix] = useState(null);

  useEffect(() => {
    const fetchUserOptions = async () => {
      try {
        access_token = localStorage.getItem('access_token');
        api_base_url = process.env.REACT_APP_BACKEND_URL;

        const decoded = await decodeToken(access_token);
        setUserId(decoded.user_id);

      } catch (error) {
        console.error('Error fetching user options:', error);
      }
    };

    fetchUserOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosCentral.get(`${api_base_url}/api/user/checkPatch/${user_id}`, {
          headers: {
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
  }, [isLoading]);

  const handleLinkClick = (fix) => {
    setPopupFix(fix);
  };

  return (
    <div>
      <h2>User App</h2>
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
                {item.fix ? (
                  <td>
                    <NavLink to="#" onClick={() => handleLinkClick(item.fix)}>
                    {item.DisplayName}
                    </NavLink>
                </td>
                ) : (
                  <td>{item.DisplayName}</td>
                )}
                <td>{item.DisplayVersion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {popupFix && (
        <div className='overlay'>
          <div className="popup">
            <h3>Missing Fix Information</h3>
            {popupFix.map(fix => (
              <div>
                <h4>Version - {fix.version}</h4>
                {fix.fix.map(issue => (
                  <div>
                    Issue No.{issue.issueID} - {issue.description}
                  </div>
                ))}
              </div>
            ))}
            <button style={{position:'sticky',bottom:'0px', left:'700px'}} onClick={() => setPopupFix(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAppPageSub;