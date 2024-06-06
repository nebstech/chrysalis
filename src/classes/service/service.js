// service.js
export const ServiceField = {
  type: '',
  prompt: '',
  choices: [],  // Only for 'radio' and 'checkbox'
};

export const TaskStatuses = [
  'rejected',
  'pending',
  'accepted',
  'inProgress',
  'done',
];

export const RequestTextField = {
  type: 'text',
  prompt: 'example prompt',
  value: 'example value',
};

export const RequestRadioField = {
  type: 'radio',
  prompt: 'example prompt',
  choices: ['option1', 'option2'],
  selection: 0,
};

export const RequestCheckboxField = {
  type: 'checkbox',
  prompt: 'example prompt',
  choices: ['option1', 'option2'],
  selection: [0],
};

export const RequestField = {
  RequestRadioField,
  RequestCheckboxField,
  RequestTextField,
};

export const TaskStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'inProgress',
  REJECTED: 'rejected',
  DONE: 'done',
};

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
        default:
          throw new Error('Invalid field type');
      }
    }),
  };
}

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

  form.fields.forEach((field) => {
    if (field.prompt === '') {
      errors.push('Prompt name cannot be empty');
    }

    if (['radio', 'checkbox'].includes(field.type)) {
      const emptyFields = field.choices.filter((choice) => choice === '').length;
      if (emptyFields > 0) {
        errors.push('Field has empty choices');
      }
    }
  });

  return errors;
}

export function createService(name, description, fields, tasks) {
  return {
    name,
    description,
    fields,
    tasks,
  };
}

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

export function loadServiceField(field) {
  switch (field.type) {
    case 'text':
      return { type: 'text', prompt: field.prompt };
    case 'radio':
      return { type: 'radio', prompt: field.prompt, choices: field.choices };
    case 'checkbox':
      return { type: 'checkbox', prompt: field.prompt, choices: field.choices };
    default:
      throw new Error('Invalid type');
  }
}

export function loadRequestField(field) {
  switch (field.type) {
    case 'text':
      return { type: 'text', prompt: field.prompt, value: field.value };
    case 'radio':
      return { type: 'radio', prompt: field.prompt, choices: field.choices, selection: field.options };
    case 'checkbox':
      return { type: 'checkbox', prompt: field.prompt, choices: field.choices, selection: field.options };
    default:
      throw new Error('Invalid type');
  }
}

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

export function loadTask(task) {
  return {
    taskID: task.id,
    serviceID: task.service,
    client: task.client,
    status: loadStatus(task.status),
    requestFields: task.request_fields.map(loadRequestField),
  };
}

export const Service = {
  id: 1,
  user: { id: 1, username: 'user' },
  name: 'Service Name',
  description: 'Service Description',
  fields: [RequestTextField, RequestRadioField, RequestCheckboxField],
  tasks: [],
};

export const Task = {
  taskID: 1,
  serviceID: 1,
  client: 'Client Name',
  requestFields: [
    RequestTextField,
    RequestRadioField,
    RequestCheckboxField,
  ],
  status: TaskStatus.PENDING,
};

export function createDefaultField(formField) {
  switch (formField.type) {
    case 'text':
      return {
        ...formField,
        value: '',
      };
    case 'radio':
      return {
        ...formField,
        selection: 0,
      };
    case 'checkbox':
      return {
        ...formField,
        selection: [],
      };
  }
}
