import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '@/api/api';
import { useFormAndValidation } from '@/hooks/useFormAndValidation';

import styles from './register-page.module.css';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/profile';
  const [register, { isLoading, error }] = useRegisterMutation();
  const { values, handleChange, resetForm, isValid } = useFormAndValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      console.log(values);
      await register(values).unwrap();
      resetForm();
      navigate(from, {
        state: {
          ...location.state,
        },
      });
    }
  };

  return (
    <div className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <span className="mb-6">
          <Input
            placeholder="Имя"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </span>
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
