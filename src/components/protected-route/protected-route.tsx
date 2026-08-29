import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/hooks/hooks';
import { getIsAuthChecked, getUser } from '@/services/user/slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: ProtectedRouteProps): React.JSX.Element | null => {
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const user = useAppSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} state={location.state} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return component;
};
