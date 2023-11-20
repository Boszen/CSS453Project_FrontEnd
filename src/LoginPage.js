import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './loginRegister.css'

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
        let {access_token , refresh_token} = response.data.data.token

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        navigate('/userAppPage');
    })
    .catch(error => {
        console.error('Error posting data:', error);
    });

  };

  return (
    <div className='center'>
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
      <div><Link to="/registerPage"><b>Register</b></Link></div>
    </div>
  );
};

export default LoginPage;
