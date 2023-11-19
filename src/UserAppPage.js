import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const api_base_url = process.env.REACT_APP_BACKEND_URL

const UserAppPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {

  };

  return (
    <div>
      <h2>UserApp</h2>
      <div><Link to="/userAppPage"><b>User App</b></Link></div>
      <div><Link to="/allAppPage">All App</Link></div>
      <div><Link to="/comNetPage">Computer Network Management</Link></div>
    </div>
  );
};

export default UserAppPage;
