import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const api_base_url = process.env.REACT_APP_BACKEND_URL

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [accountName, setAccountName] = useState('');
    const navigate = useNavigate(); 
    
    const handleRegister = () => {
        axios.post(`${api_base_url}/api/user/registerUser`,
        { 
            username: username,
            password: password,
            displayname: accountName,
            email: email
        })
        .then(response => {
            console.log(response.data);
            navigate('/loginPage');
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
    } ;

    return (
        <div>
        <h2>Registration</h2>
        <form>
        <div>
          <input
            type="text"
            placeholder='Username'
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder='Password'
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder='Account Name'
            id="accountName"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder='Email'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
        <div><Link to="/loginPage"><b>Login</b></Link></div>
        </div>
    );
    };

export default RegisterPage;
