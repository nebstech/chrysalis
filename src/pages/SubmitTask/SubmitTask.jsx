import React from 'react';
import SubmitTaskForm from '../../components/SubmitTaskForm/SubmitTaskForm';
import styles from './SubmitTask.module.css';
import { Navbar } from '../../components/Navbar/Navbar';

export default function SubmitTask() {
  return (
    <>
    <Navbar />
    <div className={styles.submitTaskContainer}>
      <SubmitTaskForm />
    </div>
    </>
  );
}
