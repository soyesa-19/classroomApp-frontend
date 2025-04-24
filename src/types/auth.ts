export type AuthCtx = {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userDetails: User) => Promise<void>;
  logout: () => void;
};

export type ErrorType = {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
