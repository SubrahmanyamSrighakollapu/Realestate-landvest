import axios from 'axios';

const BASE_URL = 'https://realestate.vsahasoft.com/api/v1';

export const authService = {
  login: async (code, password) => {
    const response = await axios.post(`${BASE_URL}/login`, {
      code,
      password
    });
    
    if (response.data.success && response.data.token) {
      sessionStorage.setItem('authToken', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  fetchEmployeeInfo: async (code) => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.post(`${BASE_URL}/admin/employee/info`, { code }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        sessionStorage.setItem('employeeInfo', JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error('Failed to fetch employee info:', error);
    }
  },

  signup: async (formData) => {
    const response = await axios.post(`${BASE_URL}/signup`, formData);
    
    if (response.data.success && response.data.token) {
      sessionStorage.setItem('authToken', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  logout: () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('employeeInfo');
  },

  getToken: () => {
    return sessionStorage.getItem('authToken');
  },

  getUser: () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getEmployeeData: () => {
    const employeeInfo = sessionStorage.getItem('employeeInfo');
    return employeeInfo ? JSON.parse(employeeInfo) : null;
  }
};
