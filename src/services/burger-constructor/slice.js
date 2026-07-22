import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      const ingredient = { ...action.payload, id: nanoid() };
      state.ingredients.push(ingredient);
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    moveIngredient: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, removed);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const selectPrice = createSelector(
  (state) => state.burgerConstructor.ingredients,
  (state) => state.burgerConstructor.bun,
  (ingredients, bun) => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
    return bunPrice + ingredientsPrice;
  }
);

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearConstructor,
} = burgerConstructorSlice.actions;
