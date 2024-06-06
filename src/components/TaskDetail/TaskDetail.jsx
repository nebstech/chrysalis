import React from 'react';
import PropTypes from 'prop-types';
import TaskDetailField from './TaskDetailField/TaskDetailField';
import { Task, Service } from '../../classes/service/service'; // Ensure these are correctly exported

export default function TaskDetail({ task, service, clientName, changeTaskStatus, deleteTask }) {
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
  task: PropTypes.shape({
    taskID: PropTypes.number.isRequired,
    serviceID: PropTypes.number.isRequired,
    client: PropTypes.string.isRequired,
    requestFields: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          prompt: PropTypes.string.isRequired,
          value: PropTypes.string,
        }),
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          prompt: PropTypes.string.isRequired,
          choices: PropTypes.arrayOf(PropTypes.string).isRequired,
          selection: PropTypes.number,
        }),
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          prompt: PropTypes.string.isRequired,
          choices: PropTypes.arrayOf(PropTypes.string).isRequired,
          selection: PropTypes.arrayOf(PropTypes.number).isRequired,
        }),
      ]).isRequired
    ).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
  }).isRequired,
  clientName: PropTypes.string.isRequired,
  changeTaskStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};
