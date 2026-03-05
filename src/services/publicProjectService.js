const API_BASE_URL = 'https://api.landvestinfra.com/api/v1';

export const publicProjectService = {
  async getProjects() {
    try {
      const response = await fetch(`${API_BASE_URL}/projectlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching public projects:', error);
      return { success: false, data: [] };
    }
  }
};