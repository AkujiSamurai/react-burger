import { createSelector, createSlice } from '@reduxjs/toolkit';

import { loadIngredients } from './actions';

import type { TIngredient } from '@/utils/types';

import type { RootState } from '../store';

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  isError: string | null;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true,
  isError: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error?.message ?? 'Неизвестная ошибка';
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
  },
});

export const selectIngredientCount = createSelector(
  (state: RootState) => state.ingredients.ingredients,
  (state: RootState) => state.burgerConstructor.ingredients,
  (state: RootState) => state.burgerConstructor.bun,
  (allIngredients, constructorIngredients, bun) => {
    const counts: Record<string, number> = {};

    constructorIngredients.forEach((item) => {
      const id = item._id;
      counts[id] = (counts[id] || 0) + 1;
    });

    if (bun) {
      const id = bun._id;
      counts[id] = 2;
    }

    return allIngredients.map((item) => ({
      ...item,
      __v: counts[item._id] || 0,
    }));
  }
);

export const { getIngredients } = ingredientsSlice.selectors;
