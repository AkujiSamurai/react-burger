import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder } from '@/api/api';

import type { Order } from '@/api/types';

export const placeOrder = createAsyncThunk<Order, string[]>(
  'order/createOrder',
  createOrder
);
