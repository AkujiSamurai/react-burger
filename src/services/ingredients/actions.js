import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '@/api/api';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    return getIngredients();
  }
);
