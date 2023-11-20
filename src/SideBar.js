import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { decodeToken } from './TokenHandler';
import './sidebar.css';

let access_token 
let refresh_token 

const Sidebar = () => {
  const [user_id, setUserId] = useState('');

  useEffect(() => {
    access_token = localStorage.getItem('access_token')
    refresh_token = localStorage.getItem('refresh_token')

    const decodedToken = decodeToken(access_token);
    setUserId(decodedToken.user_id);
  }, []);

  return (
    <div className="sidebar">
      <div><p>User ID: {user_id}</p></div>
      <nav>
        <ul>
          <li>
            <NavLink to="/userAppPage" activeclassname="active">
              User App
            </NavLink>
          </li>
          <li>
            <NavLink to="/allAppPage" activeclassname="active">
              All App
            </NavLink>
          </li>
          <li>
            <NavLink to="/comNetPage" activeclassname="active">
              Computer Network Management
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

