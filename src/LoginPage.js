import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import './loginRegister.css'

const api_base_url = process.env.REACT_APP_BACKEND_URL

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState('');
  const [popupOtp, setPopupOtp] = useState(false);
  const navigate = useNavigate(); 

  const handleOtp = () => {
    axios.post(`${api_base_url}/api/user/loginOtpUser`,
    { 
        user: user,
        otp: otp
    })
    .then(response => {
      let {access_token , refresh_token} = response.data.data

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      setPopupOtp(false)
      setOtp('')
      if (user.user_type == 'main'){
        navigate('/userAppPage');
      }else if (user.user_type =='sub'){
        navigate('/userAppPageSub');
      }
      
  })
  .catch(error => {
      console.error('Error posting data:', error);
      alert("OTP is Invalid")
      setPopupOtp(false)
      setOtp('')
  });
  }

  const handleLogin = () => {
    axios.post(`${api_base_url}/api/user/loginUser`,
    { 
        username: username,
        password: password 
    })
    .then(response => {
        setPopupOtp(true)
        setUser(response.data.data)
    })
    .catch(error => {
        console.error('Error posting data:', error);
        alert("Username or Password is Invalid")
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <input
            type="text"
            id="username"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <div><NavLink to="/registerPage"><b>register</b></NavLink></div>
      {popupOtp && (
        <div className='overlay'>
          <div className="popup">
            <h2>OTP is sent to you email</h2>
            <h3>Enter your OTP</h3>
            <div>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button style={{position:'absolute',bottom:'20px',right:'10px'}} onClick={handleOtp}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
