import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { authApi } from '@/api/api';
import { orderApi } from '@/api/orderApi';

import { burgerConstructorSlice } from './burger-constructor/slice';
import { ingredientSelectedSlice } from './ingredient-selected/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';
import { userSlice } from './user/slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientSelectedSlice,
  burgerConstructorSlice,
  orderSlice,
  userSlice,
  authApi,
  orderApi
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
