// import { ServiceField } from './formField.js';

export const TaskStatuses = ['rejected', 'pending', 'accepted', 'inProgress', 'done'];

/**
 * Removes all leading and trailing whitespace from all form fields.
 *
 * @param {Object} form - A service form.
 * @returns {Object} A service form with all of its fields
 * trimmed of leading and trailing whitespace.
 */
export function sanitize(form) {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    fields: form.fields.map((field) => {
      switch (field.type) {
        case 'text':
          return {
            type: 'text',
            prompt: field.prompt.trim(),
          };
        case 'radio':
          return {
            type: 'radio',
            prompt: field.prompt.trim(),
            choices: field.choices.map((choice) => choice.trim()),
          };
        case 'checkbox':
          return {
            type: 'checkbox',
            prompt: field.prompt.trim(),
            choices: field.choices.map((choice) => choice.trim()),
          };
      }
    }),
  };
}

/**
 * Returns all formatting errors inside of a service form: empty fields,
 *
 * @param {Object} form - A service form.
 * @returns {string[]} A string of errors found inside the form.
 */
export function validate(form) {
  const errors = [];

  if (form.name === '') {
    errors.push('Name field cannot be empty');
  }

  if (form.description === '') {
    errors.push('Description field cannot be empty');
  }

  if (form.fields.length === 0) {
    errors.push('Service form must have at least one field');
  }

  for (const field of form.fields) {
    if (field.prompt === '') {
      errors.push('Prompt name cannot be empty');
    }

    if (field.type === 'radio' || field.type === 'checkbox') {
      let emptyFields = 0;
      for (const choice of field.choices) {
        if (choice === '') {
          emptyFields += 1;
        }
      }

      if (emptyFields > 0) {
        errors.push('Field has empty choices');
      }
    }
  }

  return errors;
}

/**
 * A service is a collection of tasks that can be requested by clients.
 * Each service has a name, description, fields, and tasks.
 * Task's have the following properties:
 * - taskID: a unique identifier for the task
 * - service: the name of the service
 * - client: the name of the client
 * - requestFields: an array of fields that the client must fill out to request the service
 * -- each field has a prompt and a value
 * - status: the status of the task (pending, accepted, inProgress, rejected, done)
 * Services have the following properties:
 * - name: the name of the service
 * - description: a description of the service
 * - fields: an array of fields that the client must fill out to request the service
 * -- each field has a prompt and a type (text, radio, checkbox)
 * - tasks: an array of tasks that have been requested for the service
 * -- each task has a taskID, service, client, requestFields, and status
 * @param {string} name - The name of the service.
 * @param {string} description - A description of the service.
 * @param {Array} fields - An array of fields that the client must fill out to request the service.
 * @param {Array} tasks - An array of tasks that have been requested for the service.
 * @returns {Object} A service object.
 */
export function createService(name, description, fields, tasks) {
  return {
    name,
    description,
    fields,
    tasks,
  };
}

/**
 * Loads a service from a plain object.
 *
 * @param {Object} service - A plain object representing a service.
 * @returns {Object} A service object.
 */
export function loadService(service) {
  return {
    id: service.id,
    user: { id: service.user.id, username: service.user.username },
    name: service.name,
    description: service.description,
    fields: service.form_fields.map(loadServiceField),
    tasks: service.tasks ? service.tasks.map(loadTask) : [],
  };
}

/**
 * Loads a service field from a plain object.
 *
 * @param {Object} field - A plain object representing a service field.
 * @returns {Object} A service field object.
 */
export function loadServiceField(field) {
  switch (field.type) {
    case 'text':
      return {
        type: 'text',
        prompt: field.prompt,
      };
    case 'radio':
      return {
        type: 'radio',
        prompt: field.prompt,
        choices: field.choices,
      };
    case 'checkbox':
      return {
        type: 'checkbox',
        prompt: field.prompt,
        choices: field.choices,
      };
    default:
      throw new Error('Invalid type');
  }
}

/**
 * Loads a request field from a plain object.
 *
 * @param {Object} field - A plain object representing a request field.
 * @returns {Object} A request field object.
 */
export function loadRequestField(field) {
  switch (field.type) {
    case 'text':
      return {
        type: 'text',
        prompt: field.prompt,
        value: field.value,
      };
    case 'radio':
      return {
        type: 'radio',
        prompt: field.prompt,
        choices: field.choices,
        selection: field.options,
      };
    case 'checkbox':
      return {
        type: 'checkbox',
        prompt: field.prompt,
        choices: field.choices,
        selection: field.options,
      };
    default:
      throw new Error('Invalid type');
  }
}

/**
 * Loads a task status from a short code.
 *
 * @param {string} status - A short code representing a task status.
 * @returns {string} A task status.
 */
export function loadStatus(status) {
  switch (status) {
    case 'P':
      return 'pending';
    case 'A':
      return 'accepted';
    case 'IP':
      return 'inProgress';
    case 'C':
      return 'done';
    case 'X':
      return 'rejected';
    default:
      throw new Error('Invalid status');
  }
}

/**
 * Loads a task from a plain object.
 *
 * @param {Object} task - A plain object representing a task.
 * @returns {Object} A task object.
 */
export function loadTask(task) {
  return {
    taskID: task.id,
    serviceID: task.service,
    client: task.client,
    status: loadStatus(task.status),
    requestFields: task.request_fields.map(loadRequestField),
  };
}
