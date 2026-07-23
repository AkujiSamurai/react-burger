import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burger-constructor/slice';
import { ingredientSelectedSlice } from './ingredient-selected/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  ingredientSelectedSlice,
  burgerConstructorSlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer,
});
