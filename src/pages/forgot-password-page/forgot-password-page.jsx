import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForgotPasswordMutation } from '@/api/api';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [isError, setIsError] = useState();
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const validateEmail = () => {
    let newError = '';
    if (email === '') {
      newError = 'Обязательное поле';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newError = 'Введите корректный email';
      }
    }
    setIsError(newError);
    return newError === '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      await forgotPassword({ email: email }).unwrap();
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
            errorText={isError}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </span>
        <span className="mb-20">
          <Button size="medium" htmlType="submit" disabled={isLoading}>
            Восстановить
          </Button>
        </span>
        {error && (
          <div className={`${styles.error} text text_type_main-medium mb-5`}>
            {error?.data.message || 'Ошибка'}
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
