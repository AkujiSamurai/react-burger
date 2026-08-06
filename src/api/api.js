import { createApi } from '@reduxjs/toolkit/query/react';
import { create } from 'axios';

import { fetchWithRefresh } from '@/utils/token';
import { url } from '@/utils/url';

export const api = create({
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

export const refreshToken = async () => {
  const refreshData = await api.post('/auth/token', {
    token: localStorage.getItem('refreshToken'),
  });

  localStorage.setItem('accessToken', refreshData.accessToken);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  return refreshData;
};

export const baseQueryWithRefresh = async (args) => {
  const { url, method = 'GET', ...rest } = args;
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = token;
  }

  const options = {
    method,
    headers,
    ...rest,
  };

  try {
    const data = await fetchWithRefresh(url, options);

    return { data };
  } catch (error) {
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data,
      },
    };
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        data: credentials,
      }),
      transformResponse: (response) => {
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return response.user;
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        data: credentials,
      }),
      transformResponse: (response) => {
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return response.user;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        data: { token: localStorage.getItem('refreshToken') },
      }),
      transformResponse: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
      transformResponse: (response) => response.user,
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: '/password-reset',
        method: 'POST',
        data: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: '/password-reset/reset',
        method: 'POST',
        data: credentials,
      }),
    }),
    editUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/user',
        method: 'PATCH',
        data: credentials,
      }),
      transformResponse: (response) => response.user,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useEditUserMutation,
} = authApi;
