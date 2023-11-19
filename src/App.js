// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import UserAppPage from './UserAppPage'
import AllAppPage from './AllAppPage'
import ComNetPage from './ComNetPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/userAppPage" element={<UserAppPage />} />
        <Route path="/allAppPage" element={<AllAppPage />} />
        <Route path="/comNetPage" element={<ComNetPage />} />
      </Routes>
    </Router>
  );
};

export default App;