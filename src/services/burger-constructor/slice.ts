import {
  createSelector,
  createSlice,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

import type { RootState } from '../store';

export type IngredientsForOrder = TIngredient & { id: string };

type Order = {
  bun: TIngredient | null;
  ingredients: IngredientsForOrder[];
};

type MoveIndex = {
  fromIndex: number;
  toIndex: number;
};

const initialState: Order = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<IngredientsForOrder>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      },
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    moveIngredient: (state, action: PayloadAction<MoveIndex>) => {
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
  (state: RootState) => state.burgerConstructor.ingredients,
  (state: RootState) => state.burgerConstructor.bun,
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
