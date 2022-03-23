import requests from "../utils/requests";
import { authAxios } from "../utils/axios";

export const fetchUserInfoService = async (
  token: string | null,
  username: string
) => {
  const res = await authAxios(token).get(requests.getUserInfo(username));
  return res;
};

export const followUserService = async (
  token: string | null,
  username: string
) => {
  const res = await authAxios(token).post(requests.followUser, {
    username: username,
  });
  return res;
};

export const unFollowUserService = async (
  token: string | null,
  username: string
) => {
  const res = await authAxios(token).post(requests.unFollowUser, {
    username: username,
  });
  return res;
};

export const fetchUserSuggestionsService = async (token: string | null) => {
  const res = await authAxios(token).get(requests.suggestions);
  return res;
};
