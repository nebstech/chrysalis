import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import styles from './Auth.module.css';
import { Navbar } from '../Navbar/Navbar.jsx';


export default function Authentication() {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (mode === 'register') {
      setSignupMode(true);
    } else {
      setSignupMode(false);
    }
  }, [mode]);

  const [signupMode, setSignupMode] = useState(mode === 'register');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignUp = async () => {
    if (register) {
      await register({ username, email, password });
      navigate('/');
    }
  };

  const handleLogin = async () => {
    if (login) {
      await login({ username, password });
      navigate('/');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.authContainer}>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Username</label>
            <input type="text" value={username} onChange={handleUsernameChange} required />
          </div>
          {signupMode && (
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" value={email} onChange={handleEmailChange} required />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          {!signupMode ? (
            <button type="button" onClick={handleLogin} className={styles.authButton}>Log In</button>
          ) : (
            <button type="button" onClick={handleSignUp} className={styles.authButton}>Sign Up</button>
          )}
        </form>
        <div className={styles.toggle}>
          {!signupMode ? (
            <p>
              New? <a href="/auth?mode=register" className={styles.toggleButton}>Sign Up</a> instead.
            </p>
          ) : (
            <p>
              Already have an account? <a href="/auth?mode=signin" className={styles.toggleButton}>Log In</a>.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
