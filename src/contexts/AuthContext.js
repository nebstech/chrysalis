import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser, registerUser, verifyUser } from '../services/apiServices';
import { getToken, setToken } from '../services/tokenService';

export const AuthContext = createContext({
  storedToken: null,
  username: '',
  loggedInUserID: null,
  isLoggedIn: false,
  loaded: false,
});

export function AuthContextProvider(props) {
  const [storedToken, setStoredToken] = useState(() => {
    try {
      verifyUser();
      return getToken();
    } catch (e) {
      console.error('Error during initial token verification:', e);
      return null;
    }
  });
  const [username, setUsername] = useState(null);
  const [loggedInUserID, setLoggedInUserID] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const runner = async () => {
      try {
        const token = getToken();
        if (token === null) {
          setLoaded(true);
          return;
        }
        const data = await verifyUser();
        setToken(data.access);
        setStoredToken(data.access);
        setUsername(data.user.username);
        setLoggedInUserID(data.user.id);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Error during token verification:', e);
      } finally {
        setLoaded(true);
      }
    };
    runner();
  }, []);

  async function login(payload) {
    try {
      const data = await loginUser(payload);
      setToken(data.access);
      setStoredToken(data.access);
      setUsername(data.user.username);
      setLoggedInUserID(data.user.id);
      setIsLoggedIn(true);
    } catch (e) {
      console.error('Error during login:', e);
      throw e;
    }
  }

  async function register(payload) {
    try {
      const data = await registerUser(payload);
      setToken(data.access);
      setStoredToken(data.access);
      setUsername(data.user.username);
      setLoggedInUserID(data.user.id);
      setIsLoggedIn(true);
    } catch (e) {
      console.error('Error during registration:', e);
      throw e;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        storedToken,
        username,
        loggedInUserID,
        isLoggedIn,
        loaded,
        login,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Add prop-types validation
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
