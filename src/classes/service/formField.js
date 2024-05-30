export const formFieldTypes = ['text', 'radio', 'checkbox'];

export class ServiceTextField {
  constructor(prompt) {
    this.type = 'text';
    this.prompt = prompt;
  }
}

export class ServiceRadioField {
  constructor(prompt, choices) {
    this.type = 'radio';
    this.prompt = prompt;
    this.choices = choices;
  }
}

export class ServiceCheckboxField {
  constructor(prompt, choices) {
    this.type = 'checkbox';
    this.prompt = prompt;
    this.choices = choices;
  }
}

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
