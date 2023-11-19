import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const api_base_url = process.env.REACT_APP_BACKEND_URL

const ComNetPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {

  };

  return (
    <div>
      <h2>Computer Network Management</h2>
      <div><Link to="/userAppPage">User App Page</Link></div>
      <div><Link to="/allAppPage">All App Page</Link></div>
      <div><Link to="/comNetPage"><b>Computer Network Management Page</b></Link></div>
    </div>
  );
};

export default ComNetPage;