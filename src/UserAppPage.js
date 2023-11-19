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
      <div><Link to="/userAppPage"><b>Go to User App Page</b></Link></div>
      <div><Link to="/allAppPage">Go to All App Page</Link></div>
      <div><Link to="/comNetPage">Go to Computer Network Management Page</Link></div>
    </div>
  );
};

export default UserAppPage;
