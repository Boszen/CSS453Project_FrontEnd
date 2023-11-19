import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const api_base_url = process.env.REACT_APP_BACKEND_URL

const AllAppPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {

  };

  return (
    <div>
      <h2>AllApp</h2>
      <div><Link to="/userAppPage">User App</Link></div>
      <div><Link to="/allAppPage"><b>All App</b>.</Link></div>
      <div><Link to="/comNetPage">Computer Network Management</Link></div>
    </div>
  );
};

export default AllAppPage;