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
import ProtectedPage from './pages/ProtectedPage/ProtectedPage';

function App() {
  return (
    <Router>
      <div className={styles.App}> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/dashboard' element={<ProtectedPage><Dashboard /></ProtectedPage>} />
          <Route path='/search' element={<ProtectedPage><Search /></ProtectedPage>} />
          <Route path='/profile/:userID' element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path='/:userID/services/:servID' element={<ProtectedPage><ServiceDetail /></ProtectedPage>} />
          <Route path='/:userID/services' element={<ProtectedPage><UserServices /></ProtectedPage>} />
          <Route path='/:userID/services/create' element={<ProtectedPage><CreateService /></ProtectedPage>} />
          <Route path='/:userID/services/:servID/submit-task' element={<ProtectedPage><SubmitTask /></ProtectedPage>} />
          <Route path='/:userID/services/:servID/update-service' element={<ProtectedPage><CreateService /></ProtectedPage>} />
          <Route path='/:userID/tasks' element={<ProtectedPage><div>User Tasks</div></ProtectedPage>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
