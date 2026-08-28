import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import { useForgotPasswordMutation } from '@/api/api';
import { useFormAndValidation } from '@/hooks/useFormAndValidation';

import type React from 'react';

import type { ForgotPasswordCredentials } from '@/api/types';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { values, handleChange, isValid, resetForm } =
    useFormAndValidation<ForgotPasswordCredentials>();
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isValid) {
      await forgotPassword({ email: values.email }).unwrap();
      resetForm();
      localStorage.setItem('isPasswordReset', 'true');
      navigate('/reset-password');
    }
  };

  return (
    <div className={styles.forgot_password}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <span className="mb-6">
          <Input
            placeholder="E-mail"
            type="email"
            onChange={handleChange}
            name="email"
            value={values.email}
            required
          />
        </span>
        <span className="mb-20">
          <Button size="medium" htmlType="submit" disabled={isLoading}>
            Восстановить
          </Button>
        </span>
        {error && 'data' in error && (
          <div className={`${styles.error} text text_type_main-medium mb-5`}>
            {error.data?.message || 'Ошибка'}
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
