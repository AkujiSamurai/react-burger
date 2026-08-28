import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/api/api';
import { useFormAndValidation } from '@/hooks/useFormAndValidation';

import type React from 'react';

import type { LoginCredentials } from '@/api/types';

import styles from './login-page.module.css';

export const LoginPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/profile';
  const { values, handleChange, isValid, resetForm } =
    useFormAndValidation<LoginCredentials>();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isValid) {
      await login(values).unwrap();
      resetForm();
      navigate(from, {
        state: {
          ...location.state,
        },
      });
    }
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <span className="mb-6">
          <Input
            placeholder="E-mail"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </span>
        <span className="mb-6">
          <PasswordInput
            icon="ShowIcon"
            name="password"
            value={values.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </span>
        <span className="mb-20">
          <Button size="medium" htmlType="submit" disabled={isLoading}>
            Войти
          </Button>
        </span>

        {error && (
          <div className={`${styles.error} text text_type_main-medium mb-5`}>
            Ошибка входа. Проверьте email и пароль.
          </div>
        )}
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{' '}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
