import apiClient from './apiClient';

export const employeeService = {
  addEmployee: async (formData) => {
    const response = await apiClient.post('/admin/employee/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  listEmployees: async (search = '') => {
    const response = await apiClient.post('/admin/employees/list', { search });
    return response.data;
  },

  getEmployeeInfo: async (code) => {
    const response = await apiClient.post('/admin/employee/info', { code });
    return response.data;
  },

  updateEmployee: async (formData) => {
    const response = await apiClient.post('/admin/employee/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getPortfolio: async (code, startDate = '', endDate = '') => {
    const response = await apiClient.post('/admin/profile/portfolio', {
      code,
      startDate,
      endDate
    });
    return response.data;
  },

  getSales: async (code) => {
    const response = await apiClient.post('/admin/profile/sales', { code });
    return response.data;
  },

  getCommission: async (code) => {
    const response = await apiClient.post('/admin/profile/commission', { code });
    return response.data;
  },

  getMyTeamTree: async () => {
    const response = await apiClient.post('/admin/myteam/tree');
    return response.data;
  }
};
