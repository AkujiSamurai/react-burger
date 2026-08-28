import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type IngredientSelected = {
  ingredientSelected: TIngredient | null;
};

const initialState: IngredientSelected = {
  ingredientSelected: null,
};

export const ingredientSelectedSlice = createSlice({
  name: 'ingredientSelected',
  initialState,
  reducers: {
    setIngredientSelected: (state, action: PayloadAction<TIngredient>) => {
      state.ingredientSelected = action.payload;
    },
    clearIngredientSelected: (state) => {
      state.ingredientSelected = null;
    },
  },
  selectors: {
    getIngredientSelected: (state) => state.ingredientSelected,
  },
});

export const { setIngredientSelected, clearIngredientSelected } =
  ingredientSelectedSlice.actions;
export const { getIngredientSelected } = ingredientSelectedSlice.selectors;
