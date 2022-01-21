import requests from "../utils/requests";
import { authAxios } from "../utils/axios";

export const fetchStorysService = async (token: string | null) => {
  const res = await authAxios(token).get(requests.getStorys);
  return res;
};