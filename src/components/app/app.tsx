import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useGetUserQuery } from '@/api/api';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { FeedPage } from '@/pages/feed-page/feed-page';
import { ForgotPasswordPage } from '@/pages/forgot-password-page/forgot-password-page';
import { Home } from '@/pages/home/home';
import { LoginPage } from '@/pages/login-page/login-page';
import { NotFoundPage } from '@/pages/not-found-page/not-found-page';
import { ProfileLayout } from '@/pages/profile-layout/profile-layout';
import { ProfileOrderPage } from '@/pages/profile-order-page/profile-order-page';
import { ProfilePage } from '@/pages/profile/profile';
import { RegisterPage } from '@/pages/register-page/register-page';
import { ResetPasswordPage } from '@/pages/reset-password-page/reset-password-page';
import { clearIngredientSelected } from '@/services/ingredient-selected/slice';
import { loadIngredients } from '@/services/ingredients/actions';
import { setAuthChecked } from '@/services/user/slice';
import { isTokenExists } from '@/utils/token';
import { AppHeader } from '@components/app-header/app-header';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { ProtectedResetRoute } from '../protected-reset-route/protected-reset-route';
import { ProtectedRoute } from '../protected-route/protected-route';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useGetUserQuery(undefined, { skip: !isTokenExists() });
  const { isLoading: isLoadingIngredients, isError } = useAppSelector(
    (state) => state.ingredients
  );
  const backgroundLocation: Location = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  useEffect(() => {
    if (!isTokenExists()) {
      dispatch(setAuthChecked());
    }
  }, [dispatch]);

  const handleCloseModal = (): void => {
    dispatch(clearIngredientSelected());
    navigate('/');
  };

  if (isError) {
    return (
      <div className={`${styles.error} mt-20`}>
        <p className="text text_type_main-large">Ошибка, попробуйте позже</p>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoadingIngredients || isLoading ? (
        <Preloader />
      ) : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<Home />} />
            <Route path="/ingredient/:id" element={<IngredientDetails />} />
            <Route
              path="/register"
              element={<ProtectedRoute component={<RegisterPage />} onlyUnAuth />}
            />
            <Route
              path="/login"
              element={<ProtectedRoute component={<LoginPage />} onlyUnAuth />}
            />
            <Route
              path="/forgot-password"
              element={<ProtectedRoute component={<ForgotPasswordPage />} onlyUnAuth />}
            />
            <Route
              path="/reset-password"
              element={<ProtectedResetRoute component={<ResetPasswordPage />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute component={<ProfileLayout />} />}
            >
              <Route index element={<ProfilePage />} />
              <Route path="orders" element={<ProfileOrderPage />} />
            </Route>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route
                path="/ingredient/:id"
                element={
                  <Modal onClose={handleCloseModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};
