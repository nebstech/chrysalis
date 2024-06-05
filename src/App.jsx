import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import LandingPage from './pages/LandingPage/LandingPage';
import Authentication from './components/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateService from './pages/CreateService/CreateService';
import UserServices from './pages/UserServices/UserServices';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/:userID/services' element={<UserServices />} />
          <Route path='/:userID/services/create' element={<CreateService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
