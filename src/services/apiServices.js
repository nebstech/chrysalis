import { api } from './api.jsx';
import { loadService, loadTask } from '../classes/service/service';

export async function loginUser(payload) {
  try {
    const { data } = await api.post('/api/auth/login/', payload);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function registerUser(payload) {
  try {
    const { data } = await api.post('/api/auth/register/', {
      ...payload,
      profile: {
        bio: 'User bio goes here.'
      }
    });
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function verifyUser() {
  try {
    const { data } = await api.get('/api/auth/verify/');
    return data;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
}

export async function createService(service) {
  try {
    const fields = service.fields.map((field, idx) => {
      switch (field.type) {
        case 'text':
          return {
            type: 'text',
            prompt: field.prompt,
            index: idx,
            choices: null,
          };
        case 'radio':
          return {
            type: 'radio',
            prompt: field.prompt,
            index: idx,
            choices: field.choices,
          };
        case 'checkbox':
          return {
            type: 'checkbox',
            prompt: field.prompt,
            index: idx,
            choices: field.choices,
          };
        default:
          throw new Error('Invalid field type');
      }
    });
    return await api.post('/api/services/', {
      name: service.name,
      description: service.description,
      form_fields: fields,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

export async function createTask(serviceID, fields) {
  try {
    const newFields = fields.map((field, idx) => {
      switch (field.type) {
        case 'text':
          return {
            type: 'text',
            index: idx,
            value: field.value,
            options: null,
          };
        case 'radio':
          return {
            type: 'radio',
            index: idx,
            value: '',
            options: field.selection,
          };
        case 'checkbox':
          return {
            type: 'checkbox',
            index: idx,
            value: '',
            options: field.selection,
          };
        default:
          throw new Error('Invalid field type');
      }
    });

    return await api.post(`/api/services/${serviceID}/submit_request/`, {
      fields: newFields,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

export async function getAllServices() {
  try {
    const { data } = await api.get(`/api/services/`);
    return data.map(loadService);
  } catch (error) {
    console.error("Error fetching all services:", error);
    throw error;
  }
}

export async function getUserServices(userID) {
  try {
    const { data } = await api.get(`/api/users/${userID}/services/`);
    return data.map(loadService);
  } catch (error) {
    console.error("Error fetching user services:", error);
    throw error;
  }
}

export async function getUserServiceById(servID) {
  ('Fetching service by ID:', servID); // Debugging log
  try {
    const { data } = await api.get(`/api/services/${servID}/`);
    return loadService(data);
  } catch (error) {
    console.error("Error fetching user service by ID:", error);
    throw error;
  }
}


export async function getUserOutboundTasks(username) {
  try {
    return await api.get(`/api/${username}/tasks/`);
  } catch (error) {
    console.error("Error fetching user outbound tasks:", error);
    throw error;
  }
}

export async function updateTaskStatus(taskID, status) {
  try {
    let formattedStatus;
    switch (status) {
      case 'pending':
        formattedStatus = 'P';
        break;
      case 'accepted':
        formattedStatus = 'A';
        break;
      case 'inProgress':
        formattedStatus = 'IP';
        break;
      case 'rejected':
        formattedStatus = 'X';
        break;
      case 'done':
        formattedStatus = 'C';
        break;
      default:
        throw new Error('Invalid task status');
    }

    return await api.put(`/api/tasks/${taskID}/update_status/`, { status: formattedStatus });
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
}

export async function deleteTask(taskID) {
  try {
    return await api.delete(`/api/tasks/${taskID}/`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

export async function deleteService(serviceID) {
  try {
    return await api.delete(`/api/services/${serviceID}/`);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}

export async function getUserInfo(userID) {
  try {
    const { data } = await api.get(`/api/users/${userID}/details/`);
    return {
      userID: data.user.id,
      user: data.user.username,
      profile: data.user.profile,
      services: data.services?.map(loadService) || [],
      tasks: data.tasks?.map(loadTask) || [],
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}

export async function getClientById(clientID) {
  try {
    const { data } = await api.get(`/api/clients/${clientID}/`);
    return data; // Assuming the client data does not need to be loaded/processed like service data
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw error;
  }
}


export async function getUserDetailsById(userId) {
  try {
    const { data } = await api.get(`/api/users/${userId}/details/`);
    return data;
  } catch (error) {
    console.error('Error fetching user details by ID:', error); // Debugging log
    throw error;
  }
}

export async function updateUserInfo(userID, profileData) {
  try {
    const { data } = await api.put(`/api/profile/`, {
      username: profileData.username,
      email: profileData.email,
      password: profileData.password,
      profile: {
        bio: profileData.bio,
        location: profileData.location,
        birth_date: profileData.birth_date
      }
    });
    return data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
}
