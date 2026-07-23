import { create } from 'axios';

import { url } from '@/utils/url';

const api = create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getIngredients = async () => {
  const response = await api.get('/ingredients');
  return response.data.data;
};

export const createOrder = async (ingredients) => {
  const response = await api.post('/orders', { ingredients });
  return response.data;
};
