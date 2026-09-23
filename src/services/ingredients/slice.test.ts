import { describe, expect, it } from 'vitest';

import { loadIngredients } from './actions';
import { ingredientsSlice, selectIngredientCount } from './slice';

import type { RootState } from '@/services/store';

const reducer = ingredientsSlice.reducer;
const ingredient = {
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

describe('ingredientsSlice', () => {
  it('Должен вернуть начальное состояние', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      ingredients: [],
      isLoading: true,
      isError: null,
    });
  });
  it('pending -> isLoading=true, isError сбрасывается', () => {
    const state = { ingredients: [], isLoading: false, isError: 'Ошибка' };
    const result = reducer(state, loadIngredients.pending('reqId'));

    expect(result).toEqual({ ingredients: [], isLoading: true, isError: null });
  });
  it('fulfilled -> isLoading=false, ingredients заполнен', () => {
    const state = { ingredients: [], isLoading: true, isError: null };
    const result = reducer(state, loadIngredients.fulfilled([ingredient], 'reqId'));

    expect(result).toEqual({
      ingredients: [ingredient],
      isLoading: false,
      isError: null,
    });
  });
  it('rejected -> isLoading=false, isError заполнен', () => {
    const state = { ingredients: [], isLoading: true, isError: null };
    const action = {
      type: loadIngredients.rejected.type,
      error: {},
    };
    const result = reducer(state, action);
    expect(result).toEqual({
      ingredients: [],
      isLoading: false,
      isError: 'Неизвестная ошибка',
    });
  });
  it('Должно посчитаться что булки две', () => {
    const state = {
      ingredients: {
        ingredients: [ingredient],
        isLoading: false,
        isError: null,
      },
      burgerConstructor: {
        bun: ingredient,
        ingredients: [],
      },
    } as unknown as RootState;
    const result = selectIngredientCount(state);

    expect(result.find((i) => i._id === '60666c42cc7b410027a1a9b1')?.__v).toBe(2);
  });
});
