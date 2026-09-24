import { describe, expect, it } from 'vitest';

import {
  clearIngredientSelected,
  ingredientSelectedSlice,
  initialState,
  setIngredientSelected,
} from './slice';

const state = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};
const reducer = ingredientSelectedSlice.reducer;

describe('ingredientSelectedSlice', () => {
  it('Должен возвращать начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });
  it('Должен добавиться ингредиент', () => {
    const result = ingredientSelectedSlice.reducer(
      undefined,
      setIngredientSelected(state)
    );

    expect(result).toEqual({ ingredientSelected: state });
  });
  it('Ингредиент должен удалиться', () => {
    const result = reducer({ ingredientSelected: state }, clearIngredientSelected());

    expect(result).toEqual(initialState);
  });
});
