import { api, refreshToken } from '@/api/api';

export const isTokenExists = () => {
  return Boolean(localStorage.getItem('accessToken'));
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const response = await api({ url: endpoint, ...options });

    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if ((status === 401 || status === 403) && localStorage.getItem('refreshToken')) {
      const refreshData = await refreshToken();

      const response = await api({
        url: endpoint,
        ...options,
        headers: {
          ...options.headers,
          Authorization: refreshData.accessToken,
        },
      });

      return response.data;
    } else {
      throw error;
    }
  }
};
