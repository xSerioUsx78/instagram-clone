import { ProfileInterface, ProfileImageInterface } from "./profile";

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  is_verified: boolean;
  profile: ProfileInterface | null;
}

export interface UserSuggestionsInterface {
  id: number;
  username: string;
  is_verified: boolean;
  profile: ProfileImageInterface;
}

export interface AuthInterface {
  user: UserInterface | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  loginLoading: boolean;
  logoutLoading: boolean;
}

export interface LoginInterface {
  username: string;
  password: string;
}

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface userProfileTopBarInfo {
  posts_count: number;
  followers_count: number;
  followings_count: number;
  followed_by_user: boolean;
  user: UserInterface | null;
}
