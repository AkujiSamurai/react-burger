import { describe, expect, it } from 'vitest';

import { placeOrder } from './action';
import { initialState, orderSlice } from './slice';

const reducer = orderSlice.reducer;

describe('orderSlice', () => {
  it('Должен вернуть начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });
  it('pending -> isLoading=true, isError сбрасывается', () => {
    const state = {
      name: '',
      orderNumber: null,
      success: null,
      isLoading: false,
      isError: 'error',
    };

    const result = reducer(state, placeOrder.pending('orgId', []));
    expect(result).toEqual({
      name: '',
      orderNumber: null,
      success: null,
      isLoading: true,
      isError: null,
    });
  });
  it('fulfilled -> isLoading=false, поля заполнены', () => {
    const state = {
      name: '',
      orderNumber: null,
      success: null,
      isLoading: true,
      isError: null,
    };

    const order = { name: 'Order', order: { number: 1 }, success: true };

    const result = reducer(state, placeOrder.fulfilled(order, 'orgId', ['id']));

    expect(result).toEqual({
      name: 'Order',
      orderNumber: 1,
      success: true,
      isLoading: false,
      isError: null,
    });
  });
  it('rejected -> isLoading=false, isError заполнен', () => {
    const state = {
      name: '',
      orderNumber: null,
      success: null,
      isLoading: true,
      isError: null,
    };

    const action = {
      type: placeOrder.rejected.type,
      error: {},
    };

    const result = reducer(state, action);

    expect(result).toEqual({
      name: '',
      orderNumber: null,
      success: false,
      isLoading: false,
      isError: 'Неизвестная ошибка',
    });
  });
});
