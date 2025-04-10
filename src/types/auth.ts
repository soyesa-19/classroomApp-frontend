export type TAuthContext = {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userDetails: TUser) => Promise<void>;
  logout: () => void;
};

export type TError = {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
};

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
