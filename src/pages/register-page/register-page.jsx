import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '@/api/api';

import styles from './register-page.module.css';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/profile';
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errorForm, setErrorForm] = useState({ name: '', email: '', password: '' });
  const [register, { isLoading, error }] = useRegisterMutation();

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '' };

    if (values.name === '') {
      newErrors.name = 'Обязательное поле';
    }

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

    const notErrors =
      newErrors.name === '' && newErrors.email === '' && newErrors.password === '';
    return notErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(values);
      await register(values).unwrap();
      navigate(from);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrorForm((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <span className="mb-6">
          <Input
            placeholder="Имя"
            type="text"
            errorText={errorForm.name}
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </span>
        <span className="mb-6">
          <Input
            placeholder="E-mail"
            type="email"
            errorText={errorForm.email}
            name="email"
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
            Зарегистрироваться
          </Button>
        </span>

        {error && (
          <div className={`${styles.error} text text_type_main-medium mb-5`}>
            {error?.data.message || 'Ошибка регистрации'}
          </div>
        )}
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{' '}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};
