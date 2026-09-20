import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder } from '@/api/api';

import type { OrderCreate } from '@/api/types';

export const placeOrder = createAsyncThunk<OrderCreate, string[]>(
  'order/createOrder',
  createOrder
);
