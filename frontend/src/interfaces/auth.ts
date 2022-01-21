import { ProfileInterface } from "./profile";

export interface UserInterface {
  id: number,
  username: string,
  email: string,
  is_verified: boolean,
  profile: ProfileInterface | null
};

export interface AuthInterface {
  user: UserInterface | null,
  isAuthenticated: boolean,
  token: string | null,
  isLoading: boolean,
  loginLoading: boolean,
  logoutLoading: boolean
};

export interface LoginInterface {
  username: string,
  password: string
};

export interface RegisterInterface {
  username: string,
  email: string,
  password: string,
  confirm_password: string
};