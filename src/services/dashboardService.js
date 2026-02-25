import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = 'https://realestate.vsahasoft.com/api/v1';

export const dashboardService = {
  getLatestLeads: async () => {
    const token = authService.getToken();
    const response = await axios.post(
      `${API_BASE_URL}/admin/dashboard/latestleads`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};
