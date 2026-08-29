import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { useEditUserMutation } from '@/api/api';
import { useAppSelector } from '@/hooks/hooks';
import { useFormAndValidation } from '@/hooks/useFormAndValidation';
import { getUser } from '@/services/user/slice';

import type React from 'react';

import type { EditUserCredentials } from '@/api/types';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element | null => {
  const user = useAppSelector(getUser);

  const initialState: EditUserCredentials = {
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  };
  const { values, handleChange, isValid, setValues } =
    useFormAndValidation(initialState);
  const [edit, { isLoading, error }] = useEditUserMutation();
  const isEdit =
    values.name !== user?.name || values.email !== user?.email || values.password !== '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isValid) {
      await edit(values).unwrap();
    }
  };

  const handleCansel = (): void => {
    setValues({ name: user?.name ?? '', email: user?.email ?? '', password: '' });
  };

  useEffect(() => {
    setValues({ name: user?.name ?? '', email: user?.email ?? '', password: '' });
  }, [user]);

  return (
    <form className={styles.profile} onSubmit={handleSubmit}>
      <span className="mb-6">
        <Input
          icon="EditIcon"
          placeholder="Имя"
          type="text"
          value={values.name}
          onChange={handleChange}
          name="name"
          required
        />
      </span>
      <span className="mb-6">
        <Input
          icon="EditIcon"
          placeholder="Логин"
          type="email"
          value={values.email}
          onChange={handleChange}
          name="email"
          required
        />
      </span>
      <span className="mb-6">
        <PasswordInput
          icon="EditIcon"
          name="password"
          value={values.password}
          onChange={handleChange}
          minLength={6}
          required
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
