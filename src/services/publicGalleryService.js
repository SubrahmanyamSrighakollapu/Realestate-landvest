import axios from 'axios';

const BASE_URL = 'https://api.landvestinfra.com/api/v1';

export const publicGalleryService = {
  listImages: async (category = '') => {
    const response = await axios.post(`${BASE_URL}/gallery/list`, { category });
    return response.data;
  }
};
