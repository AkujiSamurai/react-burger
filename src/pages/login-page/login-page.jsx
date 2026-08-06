import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@/api/api';

import styles from './login-page.module.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/profile';
  const [values, setValues] = useState({ email: '', password: '' });
  const [errorForm, setErrorForm] = useState({ email: '', password: '' });
  const [login, { isLoading, error }] = useLoginMutation();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    if (values.email === '') {
      newErrors.email = 'Обязательное поле';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        newErrors.email = 'Введите корректный email';
      }
    }

    if (values.password === '') {
      newErrors.password = 'Обязательное поле';
    } else if (values.password.length < 6) {
      newErrors.password = 'Пароль слишком короткий';
    }

    setErrorForm(newErrors);

    const notErrors = newErrors.email === '' && newErrors.password === '';
    return notErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await login(values).unwrap();
      navigate(from, {
        state: {
          ...location.state,
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrorForm((prev) => ({ ...prev, [name]: '' }));
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
            errorText={errorForm.email}
            value={values.email}
            onChange={handleChange}
          />
        </span>
        <span className="mb-6">
          <PasswordInput
            icon="ShowIcon"
            name="password"
            errorText={errorForm.password}
            value={values.password}
            onChange={handleChange}
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
