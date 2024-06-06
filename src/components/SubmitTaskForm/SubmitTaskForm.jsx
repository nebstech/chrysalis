import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createTask, getUserServiceById } from '../../services/apiServices';
import { createDefaultField } from '../../classes/service/service';
import TaskFieldEditor from './TaskFieldEditor/TaskFieldEditor';
import styles from './SubmitTaskForm.module.css';

export default function SubmitTaskForm() {
  const { userID, servID } = useParams();
  const [service, setService] = useState(null);
  const [filledFields, setFilledFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const runner = async () => {
      if (userID === undefined || servID === undefined) {
        return;
      }
      try {
        const service = await getUserServiceById(Number(servID));
        setService(service);
        setFilledFields(service.fields.map((field) => createDefaultField(field)));
      } catch (error) {
        console.error('Error fetching service:', error);
        // Handle the error by showing an appropriate message or redirecting
        navigate('/error'); // Redirect to an error page or display an error message
      }
    };
    runner();
  }, [userID, servID, navigate]);

  if (service === null) return <></>;

  function updateField(idx) {
    return (req) => {
      setFilledFields((prevFields) =>
        prevFields.map((f, i) => (i === idx ? req : f)),
      );
    };
  }

  async function commit() {
    if (servID === undefined || filledFields === undefined) {
      return;
    }
    try {
      await createTask(Number(servID), filledFields);
      navigate(`/${userID}/services/${servID}`);
    } catch (error) {
      console.error('Error creating task:', error);
      // Optionally show an error message to the user
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.serviceInfo}>
        <h2>{service.name}</h2>
        <h4>{userID}</h4>
        <p>{service.description}</p>
      </div>
      {filledFields !== undefined &&
        service.fields.map((field, idx) => (
          <TaskFieldEditor
            key={idx}
            field={field}
            currentRequestField={filledFields[idx]}
            onUpdate={updateField(idx)}
          />
        ))}
      <div className={styles.buttonGroup}>
        <Link to={`/${userID}/services/${servID}`}>
          <button>Cancel</button>
        </Link>
        <button onClick={commit}>Submit Task</button>
      </div>
    </div>
  );
}
