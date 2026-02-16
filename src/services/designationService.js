import apiClient from './apiClient';

export const designationService = {
  addDesignation: async (data) => {
    const response = await apiClient.post('/admin/role/add', data);
    return response.data;
  },

  listDesignations: async (search = '') => {
    const response = await apiClient.post('/admin/roles/list', { search });
    return response.data;
  }
};
