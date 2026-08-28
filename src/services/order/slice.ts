import { createSlice } from '@reduxjs/toolkit';

import { placeOrder } from './action';

type OrderState = {
  name: string;
  orderNumber: number | null;
  success: boolean | null;
  isLoading: boolean;
  isError: string | null;
};

const initialState: OrderState = {
  name: '',
  orderNumber: null,
  success: null,
  isLoading: false,
  isError: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.orderNumber = action.payload.order.number;
        state.success = action.payload.success;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.isError = action.error.message ?? 'Неизвестная ошибка';
      });
  },
});
