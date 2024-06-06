
import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

export default function ProtectedPage({ children }) {
  const { storedToken } = useContext(AuthContext);
  if (storedToken === null) {
    return <Navigate to='/auth' />;
  }
  return children;
}
