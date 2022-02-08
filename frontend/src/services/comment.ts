import requests from "../utils/requests";
import { authAxios } from "../utils/axios";

export const addLikeService = async (
  token: string | null,
  commentID: number
) => {
  const res = await authAxios(token).post(requests.commentLike, {
    id: commentID,
  });
  return res;
};

export const deleteLikeService = async (
  token: string | null,
  commentID: number
) => {
  const res = await authAxios(token).delete(requests.commentLike, {
    data: {
      id: commentID,
    },
  });
  return res;
};

export const fetchCommentRepliesService = async (
  token: string | null,
  commentID: number
) => {
  const res = await authAxios(token).get(
    requests.fetchCommentReplies(commentID)
  );
  return res;
};
