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
      <div><Link to="/userAppPage">Go to User App Page</Link></div>
      <div><Link to="/allAppPage"><b>Go to All App Page</b>.</Link></div>
      <div><Link to="/comNetPage">Go to Computer Network Management Page</Link></div>
    </div>
  );
};

export default AllAppPage;