import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import LandingPage from './pages/LandingPage/LandingPage';
import Authentication from './components/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateService from './pages/CreateService/CreateService';
import UserServices from './pages/UserServices/UserServices';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import SubmitTask from './pages/SubmitTask/SubmitTask';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/search' element={<Search />} />
          <Route path='/profile/:userID' element={<Profile />} />
          <Route path='/:userID/services/:servID' element={<ServiceDetail />} />
          <Route path='/:userID/services' element={<UserServices />} />
          <Route path='/:userID/services/create' element={<CreateService />} />
          <Route path='/:userID/services/:servID/submit-task' element={<SubmitTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
