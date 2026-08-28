import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '@/api/api';

import type { TIngredient } from '@/utils/types';

export const loadIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/loadIngredients',
  getIngredients
);
