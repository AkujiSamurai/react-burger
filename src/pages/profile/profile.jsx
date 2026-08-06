import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useEditUserMutation } from '@/api/api';
import { getUser } from '@/services/user/slice';

import styles from './profile.module.css';

export const ProfilePage = () => {
  const user = useSelector(getUser);

  const [editUser, setEditUser] = useState({
    name: user.name,
    email: user.email,
    password: '',
  });
  const [errorsForm, setErrorsForm] = useState({ name: '', email: '', password: '' });
  const [edit, { isLoading, error }] = useEditUserMutation();

  const isEdit =
    editUser.name !== user.name ||
    editUser.email !== user.email ||
    editUser.password !== '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
    setErrorsForm((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '' };

    if (editUser.name === '') {
      newErrors.name = 'Поле не может быть пустым';
    }

    if (editUser.email === '') {
      newErrors.email = 'Поле не может быть пустым';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editUser.email)) {
        newErrors.email = 'Введите корректный email';
      }
    }

    if (editUser.password !== '' && editUser.password.length < 6) {
      newErrors.password = 'Пароль слишком короткий';
    }

    setErrorsForm(newErrors);

    const notErrors =
      newErrors.name === '' && newErrors.email === '' && newErrors.password === '';
    return notErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await edit(editUser).unwrap();
    }
  };

  const handleCansel = () => {
    setEditUser({ name: user.name, email: user.email, password: '' });
  };

  return (
    <form className={styles.profile} onSubmit={handleSubmit}>
      <span className="mb-6">
        <Input
          icon="EditIcon"
          placeholder="Имя"
          type="text"
          value={editUser.name}
          onChange={handleChange}
          name="name"
          errorText={errorsForm.name}
        />
      </span>
      <span className="mb-6">
        <Input
          icon="EditIcon"
          placeholder="Логин"
          type="email"
          value={editUser.email}
          onChange={handleChange}
          name="email"
          errorText={errorsForm.email}
        />
      </span>
      <span className="mb-6">
        <PasswordInput
          icon="EditIcon"
          name="password"
          value={editUser.password}
          onChange={handleChange}
          errorText={errorsForm.password}
        />
      </span>

      <div
        className={styles.buttons}
        style={{ visibility: isEdit ? 'visible' : 'hidden' }}
      >
        <Button
          size="medium"
          type="secondary"
          disabled={isLoading}
          htmlType="button"
          onClick={handleCansel}
        >
          Отменить
        </Button>
        <Button size="medium" htmlType="submit" disabled={isLoading}>
          Сохранить
        </Button>
      </div>

      {error && (
        <div className={`${styles.error} text text_type_main-medium`}>
          Ошибка редактирования
        </div>
      )}
    </form>
  );
};
