import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { create, type AxiosError, type AxiosRequestConfig } from 'axios';

import { fetchWithRefresh } from '@/utils/token';
import { url } from '@/utils/url';

import type { TIngredient } from '@/utils/types';

import type {
  ApiError,
  AuthResponse,
  BaseQueryError,
  BaseQueryResult,
  EditUserCredentials,
  ForgotPasswordCredentials,
  LoginCredentials,
  MessageResponse,
  Order,
  RefreshTokenResponse,
  RegisterCredentials,
  ResetPasswordCredentials,
  User,
  UserResponse,
} from './types';

type QueryArgs = AxiosRequestConfig & { url: string };

export const api = create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getIngredients = async (): Promise<TIngredient[]> => {
  const response = await api.get('/ingredients');
  return response.data.data;
};

export const createOrder = async (ingredients: string[]): Promise<Order> => {
  const response = await api.post('/orders', { ingredients });
  return response.data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const { data } = await api.post<RefreshTokenResponse>('/auth/token', {
    token: localStorage.getItem('refreshToken'),
  });

  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);

  return data;
};

export const baseQueryWithRefresh: BaseQueryFn<
  QueryArgs,
  unknown,
  BaseQueryError
> = async (args: QueryArgs): Promise<BaseQueryResult> => {
  const { url, method = 'GET', ...rest } = args;
  const token = localStorage.getItem('accessToken');

  const headers: Record<string, string> = {
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
    const data = await fetchWithRefresh<unknown>(url, options);

    return { data };
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return {
      error: {
        status: axiosError.response?.status ?? 500,
        data: axiosError.response?.data ?? {
          success: false,
          message: 'Неизвестная ошибка',
        },
      },
    };
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    register: builder.mutation<User, RegisterCredentials>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        data: credentials,
      }),
      transformResponse: (response: AuthResponse) => {
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return response.user;
      },
    }),
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        data: credentials,
      }),
      transformResponse: (response: AuthResponse) => {
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return response.user;
      },
    }),
    logout: builder.mutation<null, void>({
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
    getUser: builder.query<User, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
      transformResponse: (response: UserResponse) => response.user,
    }),
    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordCredentials>({
      query: (credentials) => ({
        url: '/password-reset',
        method: 'POST',
        data: credentials,
      }),
    }),
    resetPassword: builder.mutation<MessageResponse, ResetPasswordCredentials>({
      query: (credentials) => ({
        url: '/password-reset/reset',
        method: 'POST',
        data: credentials,
      }),
    }),
    editUser: builder.mutation<User, EditUserCredentials>({
      query: (credentials) => ({
        url: '/auth/user',
        method: 'PATCH',
        data: credentials,
      }),
      transformResponse: (response: UserResponse) => response.user,
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
