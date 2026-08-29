import { api, refreshToken } from '@/api/api';

import type { AxiosError, AxiosRequestConfig } from 'axios';

export const isTokenExists = (): boolean => {
  return Boolean(localStorage.getItem('accessToken'));
};

export const fetchWithRefresh = async <T>(
  endpoint: string,
  options: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api({ url: endpoint, ...options });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
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
