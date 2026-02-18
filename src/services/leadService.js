import apiClient from './apiClient';

export const leadService = {
  getLeadSources: async () => {
    const response = await apiClient.post('/admin/leadsource/list');
    return response.data;
  },

  getProjects: async () => {
    const response = await apiClient.post('/admin/projects/list');
    return response.data;
  },

  getPropertyTypes: async () => {
    const response = await apiClient.post('/admin/propertytype/list');
    return response.data;
  },

  getBuyingPurposes: async () => {
    const response = await apiClient.post('/admin/leads/buyingpurpose');
    return response.data;
  },

  getLeadStatuses: async () => {
    const response = await apiClient.post('/admin/leadstatus/list');
    return response.data;
  },

  addLead: async (data) => {
    const response = await apiClient.post('/admin/leads/add', data);
    return response.data;
  },

  getPricingOptions: async (projectId) => {
    const response = await apiClient.post('/admin/project/pricinginfo', { id: projectId });
    return response.data;
  }
};
