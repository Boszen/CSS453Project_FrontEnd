import React, { useState, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { decodeToken } from './TokenHandler';
import './sidebar.css';

let access_token 
let refresh_token 

const Sidebar = () => {
  const [user_id, setUserId] = useState('');
  const [user_type, setUserType] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  useEffect(() => {
    access_token = localStorage.getItem('access_token')
    refresh_token = localStorage.getItem('refresh_token')

    const decoded = decodeToken(access_token);
    setUserId(decoded.user_id);
    setUserType(decoded.user_type);
  }, []);

  return (
    <div className="sidebar">
      <div><p>User ID: {user_id}</p></div>
      <nav>
        {user_type == 'main' && (
          <ul>
            <li>
              <NavLink to="/userAppPage" activeclassname="active" className="sideBarNav">
                User App
              </NavLink>
            </li>
            <li>
              <NavLink to="/allAppPage" activeclassname="active" className="sideBarNav">
                All Supported App
              </NavLink>
            </li>
            <li>
              <NavLink to="/comNetPage" activeclassname="active" className="sideBarNav">
                Computer Network Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/localAgentPage" activeclassname="active" className="sideBarNav">
                Donwload Local Agent
              </NavLink>
            </li>
            <li>
              <NavLink to="/loginPage" activeclassname="active" className="sideBarNav" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </ul>
        )}
        {user_type == 'sub' && (
          <ul>
            <li>
              <NavLink to="/userAppPageSub" activeclassname="active" className="sideBarNav">
                User App
              </NavLink>
            </li>
            <li>
              <NavLink to="/allAppPage" activeclassname="active" className="sideBarNav">
                All Supported App
              </NavLink>
            </li>
            <li>
              <NavLink to="/localAgentPage" activeclassname="active" className="sideBarNav">
                Donwload Local Agent
              </NavLink>
            </li>
            <li>
              <NavLink to="/loginPage" activeclassname="active" className="sideBarNav" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

