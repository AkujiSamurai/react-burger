import { Navigate } from 'react-router-dom';

export const ProtectedResetRoute = ({ component }) => {
  if (!localStorage.getItem('isPasswordReset')) {
    return <Navigate to="/login" replace />;
  }

  return component;
};
