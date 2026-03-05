import apiClient from './apiClient';

export const reportService = {
  getTransactionReport: async (params = {}) => {
    const response = await apiClient.post('/admin/reports/transaction', { params });
    return response.data;
  },
  getAssociatesReport: async (payload = {}) => {
    const response = await apiClient.post('/admin/reports/associates', payload);
    return response.data;
  },
  exportAssociatesReport: async () => {
    const response = await apiClient.post('/admin/reports/associates', { exportExcel: 1 }, { responseType: 'blob' });
    return response;
  }
};
