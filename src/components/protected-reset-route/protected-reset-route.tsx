import { Navigate } from 'react-router-dom';

type ProtectedResetRouteProps = {
  component: React.ReactElement;
};

export const ProtectedResetRoute = ({
  component,
}: ProtectedResetRouteProps): React.JSX.Element => {
  if (!localStorage.getItem('isPasswordReset')) {
    return <Navigate to="/login" replace />;
  }

  return component;
};
