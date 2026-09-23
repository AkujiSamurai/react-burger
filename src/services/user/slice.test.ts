import { expect, it, describe } from 'vitest';

import { setAuthChecked, userSlice } from './slice';

const reducer = userSlice.reducer;

const user = {
  name: 'test',
  email: 'test@test.ru',
};

describe('userSlice', () => {
  it('Должен вернуть начальное состояние', () => {
    const result = reducer(undefined, { type: '' });

    expect(result).toEqual({
      user: null,
      isAuthChecked: false,
    });
  });
  it('Должен установить isAuthChecked в true', () => {
    const result = reducer(undefined, setAuthChecked());

    expect(result).toEqual({
      user: null,
      isAuthChecked: true,
    });
  });
  it('Должен сохранить пользователя после успешного register', () => {
    const action = {
      type: 'authApi/executeMutation/fulfilled',
      payload: user,
      meta: {
        arg: {
          endpointName: 'register',
        },
      },
    };

    const result = reducer(undefined, action);

    expect(result).toEqual({
      user: {
        name: 'test',
        email: 'test@test.ru',
      },
      isAuthChecked: true,
    });
  });
  it('Должен сохранить пользователя после успешного login', () => {
    const action = {
      type: 'authApi/executeMutation/fulfilled',
      payload: user,
      meta: {
        arg: {
          endpointName: 'login',
        },
      },
    };

    const result = reducer(undefined, action);

    expect(result).toEqual({
      user: {
        name: 'test',
        email: 'test@test.ru',
      },
      isAuthChecked: true,
    });
  });
  it('Должен сохранить пользователя после успешного getUser', () => {
    const action = {
      type: 'authApi/executeQuery/fulfilled',
      payload: user,
      meta: {
        arg: {
          endpointName: 'getUser',
        },
      },
    };

    const result = reducer(undefined, action);

    expect(result).toEqual({
      user: {
        name: 'test',
        email: 'test@test.ru',
      },
      isAuthChecked: true,
    });
  });
  it('Должен сброситься пользователь после ошибки getUser', () => {
    const action = {
      type: 'authApi/executeQuery/rejected',
      meta: {
        arg: {
          endpointName: 'getUser',
        },
      },
    };

    const state = {
      user: user,
      isAuthChecked: false,
    };

    const result = reducer(state, action);

    expect(result).toEqual({
      user: null,
      isAuthChecked: true,
    });
  });
  it('Должен сброситься пользователь после успешного logout', () => {
    const action = {
      type: 'authApi/executeMutation/fulfilled',
      meta: {
        arg: {
          endpointName: 'logout',
        },
      },
    };

    const state = {
      user: user,
      isAuthChecked: true,
    };

    const result = reducer(state, action);

    expect(result).toEqual({
      user: null,
      isAuthChecked: true,
    });
  });
  it('Должны поменяться данные пользователя после успешного editUser', () => {
    const action = {
      type: 'authApi/executeMutation/fulfilled',
      payload: { name: 'EditTest', email: 'edittest@test.ru' },
      meta: {
        arg: {
          endpointName: 'editUser',
        },
      },
    };

    const state = {
      user: user,
      isAuthChecked: true,
    };

    const result = reducer(state, action);

    expect(result).toEqual({
      user: { name: 'EditTest', email: 'edittest@test.ru' },
      isAuthChecked: true,
    });
  });
});
