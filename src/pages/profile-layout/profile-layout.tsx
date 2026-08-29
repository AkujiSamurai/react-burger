import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { useLogoutMutation } from '@/api/api';

import styles from './profile-layuot.module.css';

export const ProfileLayout = (): React.JSX.Element => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const [logout, { error }] = useLogoutMutation();

  const handleClick = async (): Promise<void> => {
    await logout();
  };

  return (
    <div className={`${styles.profileLayout} mt-30`}>
      <div className={styles.content}>
        <div className={`${styles.menu} mr-15`}>
          <nav className={`${styles.menu} text text_type_main-medium mb-20`}>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
            >
              Профиль
            </NavLink>
            <NavLink
              to="/profile/orders"
              end
              className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
            >
              История заказов
            </NavLink>
            <NavLink to="/login" className={styles.link} onClick={handleClick}>
              Выход
            </NavLink>
            {error && (
              <div className={`${styles.error} text text_type_main-medium`}>
                Ошибка выхода
              </div>
            )}
          </nav>
          {isProfilePage && (
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </p>
          )}
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
