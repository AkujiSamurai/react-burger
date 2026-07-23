import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredientSelected: null,
};

export const ingredientSelectedSlice = createSlice({
  name: 'ingredientSelected',
  initialState,
  reducers: {
    setIngredientSelected: (state, action) => {
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
