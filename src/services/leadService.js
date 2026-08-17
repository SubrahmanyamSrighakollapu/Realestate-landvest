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
  },

  listLeads: async (params = {}) => {
    let payload = {};
    if (typeof params === 'number' || typeof params === 'string') {
      payload = { page: Number(params) || 1, limit: 10 };
    } else {
      payload = {
        page: params.page,
        limit: params.limit,
        search: params.search ?? '',
        status: params.status ?? '',
        ...params
      };
      Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);
    }
    const response = await apiClient.post('/admin/leads/list', payload);
    return response.data;
  },

  getLeadInfo: async (id) => {
    const response = await apiClient.post('/admin/leads/info', { id });
    return response.data;
  },

  updateLead: async (data) => {
    const response = await apiClient.post('/admin/leads/update', data);
    return response.data;
  },

  collectPayment: async (data) => {
    const response = await apiClient.post('/admin/leads/collectpayment', data);
    return response.data;
  },

  getLeadReports: async (data = {}) => {
    const payload = {
      page: data.page,
      limit: data.limit,
      search: data.search ?? '',
      status: data.status ?? '',
      ...data
    };
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);
    const response = await apiClient.post('/admin/reports/lead', payload, {
      responseType: data.exportExcel === 1 ? 'blob' : 'json'
    });
    return response;
  }
};
