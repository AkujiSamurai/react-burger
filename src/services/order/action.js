import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder } from '@/api/api';

export const placeOrder = createAsyncThunk('order/createOrder', createOrder);
