import apiClient from './apiClient';

export const projectService = {
  addProject: async (formData) => {
    const response = await apiClient.post('/admin/project/add', formData);
    return response.data;
  },

  getPricingList: async () => {
    const response = await apiClient.post('/admin/project/pricinglist');
    return response.data;
  },

  updatePricing: async (data) => {
    const response = await apiClient.post('/admin/project/updatepricing', data);
    return response.data;
  },

  updateHighlights: async (data) => {
    const response = await apiClient.post('/admin/project/updatehighlights', data);
    return response.data;
  },

  updateLocations: async (data) => {
    const response = await apiClient.post('/admin/project/updatelocations', data);
    return response.data;
  },

  updateImages: async (formData) => {
    const response = await apiClient.post('/admin/project/updateimages', formData);
    return response.data;
  },

  updateLayout: async (formData) => {
    const response = await apiClient.post('/admin/project/updatelayout', formData);
    return response.data;
  },

  updateTestimonials: async (formData) => {
    const response = await apiClient.post('/admin/project/updatetestimonials', formData);
    return response.data;
  },
  addPricing: async (data) => {
    const response = await apiClient.post('/admin/pricing/add', data);
    return response.data;
  },

  updatePricingOption: async (data) => {
    const response = await apiClient.post('/admin/pricing/update', data);
    return response.data;
  },

  listProjects: async () => {
    const response = await apiClient.post('/admin/projects/list');
    return response.data;
  },

  getChildRoles: async (roleId) => {
    const response = await apiClient.post('/admin/roles/child', { role: roleId });
    return response.data;
  },

  getParentRoles: async (roleId) => {
    const response = await apiClient.post('/admin/roles/parent', { role: roleId });
    return response.data;
  }
};
