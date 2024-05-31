import React from 'react';
import PropTypes from 'prop-types';
import { Service, Task, TaskStatus } from '../../classes/service/service';
import TaskDetailField from './TaskDetailField/TaskDetailField';

export default function TaskDetail({ task, service, clientName, changeTaskStatus, deleteTask }) {
  console.log(task.requestFields);

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1 style={{ fontSize: '32px', margin: 0 }}>{service.name}</h1>
      <p>{service.description}</p>
      <hr style={{ border: 'none', height: '2px', backgroundColor: '#eee' }} />
      {task.requestFields.map((field, idx) => (
        <TaskDetailField key={idx} field={field} />
      ))}
    </div>
  );
}

TaskDetail.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  service: PropTypes.instanceOf(Service).isRequired,
  clientName: PropTypes.string.isRequired,
  changeTaskStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
