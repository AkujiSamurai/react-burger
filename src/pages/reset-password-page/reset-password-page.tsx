import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import { useResetPasswordMutation } from '@/api/api';
import { useFormAndValidation } from '@/hooks/useFormAndValidation';

import type React from 'react';

import type { ResetPasswordCredentials } from '@/api/types';

import styles from './reset-password-page.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { values, handleChange, resetForm, isValid } =
    useFormAndValidation<ResetPasswordCredentials>();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isValid) {
      await resetPassword(values).unwrap();
      localStorage.removeItem('isPasswordReset');
      resetForm();
      navigate('/login');
    }
  };

  return (
    <div className={styles.reset_password}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <span className="mb-6">
          <PasswordInput
            icon="ShowIcon"
            placeholder="Введите новый пароль"
            value={values.password}
            onChange={handleChange}
            name="password"
            required
          />
        </span>
        <span className="mb-6">
          <Input
            placeholder="Введите код из письма"
            type="text"
            value={values.token}
            onChange={handleChange}
            name="token"
            required
          />
        </span>
        <span className="mb-20">
          <Button size="medium" disabled={isLoading} htmlType="submit">
            Сохранить
          </Button>
        </span>
        {error && 'data' in error && (
          <div className={`${styles.error} text text_type_main-medium mb-5`}>
            {error.data?.message || 'Ошибка восстановления пароля'}
          </div>
        )}
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{' '}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};
