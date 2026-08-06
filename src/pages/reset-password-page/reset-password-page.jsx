import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useResetPasswordMutation } from '@/api/api';

import styles from './reset-password-page.module.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ password: '', token: '' });
  const [isErrors, setErrors] = useState({ password: '', token: '' });
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const validateForm = () => {
    const newErrors = { password: '', token: '' };

    if (values.password === '') {
      newErrors.password = 'Обязательное поле';
    } else if (values.password.length < 6) {
      newErrors.password = 'Пароль слишком короткий';
    }
    if (values.token === '') {
      newErrors.token = 'Обязательное поле';
    }

    setErrors(newErrors);

    const notErrors = newErrors.password === '' && newErrors.token === '';
    return notErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await resetPassword(values).unwrap();
      localStorage.removeItem('isPasswordReset');
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
            errorText={isErrors.password}
            value={values.password}
            onChange={handleChange}
            name="password"
          />
        </span>
        <span className="mb-6">
          <Input
            placeholder="Введите код из письма"
            type="text"
            errorText={isErrors.token}
            value={values.token}
            onChange={handleChange}
            name="token"
          />
        </span>
        <span className="mb-20">
          <Button size="medium" disabled={isLoading} htmlType="submit">
            Сохранить
          </Button>
        </span>
        {error && (
          <div className={`${styles.error} text text_type_main-medium mb-5`}>
            {error?.data.message || 'Ошибка восстановления пароля'}
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
