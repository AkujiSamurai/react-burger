import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { refreshToken } from './api';

export type Order = {
  ingredients: string[];
  name: string;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type OrdersResponse = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
  message?: string;
};

const initialOrdersResponse: OrdersResponse = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersResponse, void>({
      queryFn: () => ({
        data: initialOrdersResponse,
      }),

      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        const socket = new WebSocket(
          'wss://new-stellarburgers.education-services.ru/orders/all'
        );

        const listener = (event: MessageEvent): void => {
          const data: OrdersResponse = JSON.parse(event.data);

          updateCachedData(() => data);
        };

        socket.addEventListener('message', listener);

        await cacheEntryRemoved;

        socket.close();
      },
    }),
    getUserOrders: builder.query<OrdersResponse, void>({
      queryFn: () => ({
        data: initialOrdersResponse,
      }),

      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        let socket!: WebSocket;

        const connect = (): void => {
          const accessToken = localStorage
            .getItem('accessToken')
            ?.replace('Bearer ', '');
          socket = new WebSocket(
            `wss://new-stellarburgers.education-services.ru/orders?token=${accessToken}`
          );

          socket.addEventListener('message', listener);
        };

        const listener = async (event: MessageEvent): Promise<void> => {
          const data: OrdersResponse = JSON.parse(event.data);

          if (data.message === 'Invalid or missing token') {
            try {
              await refreshToken();

              socket.close();
              connect();
            } catch (error) {
              console.log('Не удалось обновить токен', error);
            }

            return;
          }
          updateCachedData(() => data);
        };

        connect();

        await cacheEntryRemoved;

        socket.close();
      },
    }),
  }),
});

export const { useGetOrdersQuery, useGetUserOrdersQuery } = orderApi;
