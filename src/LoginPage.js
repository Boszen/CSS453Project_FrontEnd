import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api_base_url = process.env.REACT_APP_BACKEND_URL

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = () => {
    axios.post(`${api_base_url}/api/user/loginUser`,
    { 
        username: username,
        password: password 
    })
    .then(response => {
        console.log(response.data);
        navigate('/userAppPage');
    })
    .catch(error => {
        console.error('Error posting data:', error);
    });

  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
