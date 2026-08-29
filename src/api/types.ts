export type Order = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type User = {
  name: string;
  email: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AuthResponse = {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type RefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type ForgotPasswordCredentials = {
  email: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type ResetPasswordCredentials = {
  password: string;
  token: string;
};

export type EditUserCredentials = {
  name: string;
  email: string;
  password: string;
};

export type ApiError = {
  success: boolean;
  message: string;
};

export type BaseQueryError = {
  status: number;
  data: ApiError;
};

export type BaseQueryResult =
  | {
      data: unknown;
    }
  | {
      error: BaseQueryError;
    };
