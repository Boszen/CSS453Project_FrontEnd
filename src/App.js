import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './SideBar';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserAppPage from './UserAppPage';
import AllAppPage from './AllAppPage';
import ComNetPage from './ComNetPage';

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      {!(location.pathname === '/loginPage' || location.pathname === '/registerPage') && <Sidebar />}
      
      <div style={{ marginLeft: '200px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/loginPage" />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/registerPage" element={<RegisterPage />} />
          <Route path="/userAppPage" element={<UserAppPage />} />
          <Route path="/allAppPage" element={<AllAppPage />} />
          <Route path="/comNetPage" element={<ComNetPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
