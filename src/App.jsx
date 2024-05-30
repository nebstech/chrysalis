import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import LandingPage from './pages/LandingPage/LandingPage';
import Authentication from './components/Auth/Auth';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/auth' element={<Authentication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
