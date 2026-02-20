import apiClient from './apiClient';

export const organizationService = {
  getOrgTree: async () => {
    const response = await apiClient.post('/admin/organization/tree');
    return response.data;
  },

  getAssociatesReport: async (page = 1, limit = 10, startDate = '', endDate = '', exportExcel = 0) => {
    const response = await apiClient.post('/admin/reports/associates', {
      page,
      limit,
      startDate,
      endDate,
      exportExcel
    }, {
      responseType: exportExcel === 1 ? 'blob' : 'json'
    });
    return response;
  }
};
