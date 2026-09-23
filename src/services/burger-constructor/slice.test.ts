import { nanoid } from '@reduxjs/toolkit';
import { describe, expect, it, vi } from 'vitest';

import {
  burgerConstructorSlice,
  addBun,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  clearConstructor,
  selectPrice,
} from './slice';

import type { RootState } from '@/services/store';

vi.mock('@reduxjs/toolkit', async () => {
  const actual = await vi.importActual('@reduxjs/toolkit');

  return {
    ...actual,
    nanoid: vi.fn(),
  };
});

const reducer = burgerConstructorSlice.reducer;
const bun = {
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

const main = {
  _id: '60666c42cc7b410027a1a9b5',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  __v: 0,
};

const sauce = {
  _id: '60666c42cc7b410027a1a9b7',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
};

describe('burgerConstructorSlice', () => {
  it('Должен возвращать начальное состояние', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      bun: null,
      ingredients: [],
    });
  });
  it('Должна добавиться булка', () => {
    const result = reducer(undefined, addBun(bun));
    expect(result).toEqual({ bun: { ...bun }, ingredients: [] });
  });
  it('Должен добавиться ингредиент', () => {
    vi.mocked(nanoid).mockReturnValue('id');

    const result = reducer(undefined, addIngredient(main));
    expect(result).toEqual({ bun: null, ingredients: [{ ...main, id: 'id' }] });
  });
  it('Должен удалиться ингредиент', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          ...main,
          id: 'id',
        },
      ],
    };

    const result = reducer(state, deleteIngredient('id'));
    expect(result).toEqual({ bun: null, ingredients: [] });
  });
  it('Ингредиенты должны поменяться местами', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          ...main,
          id: '1',
        },
        {
          ...sauce,
          id: '2',
        },
      ],
    };

    const result = reducer(state, moveIngredient({ fromIndex: 1, toIndex: 0 }));

    expect(result).toEqual({
      bun: null,
      ingredients: [
        {
          ...sauce,
          id: '2',
        },
        {
          ...main,
          id: '1',
        },
      ],
    });
  });
  it('Все поля должны быть очищены', () => {
    const state = {
      bun: bun,
      ingredients: [
        {
          ...main,
          id: 'id',
        },
      ],
    };

    const result = reducer(state, clearConstructor());
    expect(result).toEqual({ bun: null, ingredients: [] });
  });
  it('Должен возвращать цену', () => {
    const state = {
      burgerConstructor: {
        bun: bun,
        ingredients: [
          {
            ...main,
            id: 'id',
          },
        ],
      },
    } as RootState;

    expect(selectPrice(state)).toBe(5510);
  });
});
