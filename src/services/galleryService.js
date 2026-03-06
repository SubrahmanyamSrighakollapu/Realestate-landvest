import apiClient from './apiClient';

export const galleryService = {
  listImages: async (page = 1, limit = 10, category = '') => {
    const response = await apiClient.post('/admin/gallery/list', { page, limit, category });
    return response.data;
  },
  
  uploadImages: async (formData) => {
    const response = await apiClient.post('/admin/gallery/updateimages', formData);
    return response.data;
  },
  
  deleteImages: async (ids) => {
    const response = await apiClient.post('/admin/gallery/deleteimages', { ids });
    return response.data;
  }
};
