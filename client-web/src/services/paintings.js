import api from './api';

export const addPainting = async data => {
  const response = await api.post('paintings', data);
  return response.data;
};

export const addImage = async data => {
  const formData = new FormData();
  formData.append('file', data.file, data.name);
  const response = await api.post('paintings/img', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return response.data;
};

export const getPaintings = async () => {
  const response = await api.get('paintings');
  return response.data;
};
