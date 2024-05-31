import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCreationForm from '../../components/ServiceFormEditor/ServiceFormEditor';
import { AuthContext } from '../../contexts/AuthContext';
import { createService } from '../../services/apiServices';

export default function CreateService() {
  const { loggedInUserID, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || loggedInUserID === null) {
      navigate('/auth'); // Redirect to auth page if not logged in
    }
  }, [isLoggedIn, loggedInUserID, navigate]);

  async function onCommit(serviceForm) {
    await createService(serviceForm);
    navigate(`/${loggedInUserID}/services/`);
  }

  return <ServiceCreationForm onCommit={onCommit} />;
}
