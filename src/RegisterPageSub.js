import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { decodeToken } from './TokenHandler';

let api_base_url

const RegisterPageSub = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const {token_reg} = useParams();
    const navigate = useNavigate(); 

    const fetchData = async () => {
      try {
        api_base_url = process.env.REACT_APP_BACKEND_URL;
  
        const decoded = decodeToken(token_reg);
        setUserId(decoded.user_id);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    
    const handleRegister = () => {
      axios.put(`${api_base_url}/api/user/updateUser`,
      { 
        user_id: userId,
        username: username,
        password: password,
        user_type: 'sub'
      },
      {
        headers: {
          'Authorization' : token_reg,
          'ngrok-skip-browser-warning': 'asd',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data);
        navigate('/loginPage');
      })
      .catch(error => {
        console.error('Error posting data:', error);
        alert("Usename is taken")
      });
    };

    return (
        <div>
        <h2>Registration Sub User</h2>
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
        <div><Link to="/loginPage"><b>Login</b></Link></div>
        </div>
    );
    };

export default RegisterPageSub;
