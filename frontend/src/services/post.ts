import requests from "../utils/requests";
import { authAxios } from "../utils/axios";

export const fetchPostsService = async (token: string | null) => {
  const res = await authAxios(token).get(requests.getPosts);
  return res;
};

export const fetchPostDetailService = async (
  token: string | null,
  postID: number
) => {
  const res = await authAxios(token).get(requests.getPostDetail(postID));
  return res;
};

export const addLikeService = async (token: string | null, postID: number) => {
  const res = await authAxios(token).post(requests.postLike, { id: postID });
  return res;
};

export const deleteLikeService = async (
  token: string | null,
  postID: number
) => {
  const res = await authAxios(token).delete(requests.postLike, {
    data: {
      id: postID,
    },
  });
  return res;
};

export const postCommentService = async (
  token: string | null,
  postID: number,
  text: string,
  reply_id?: number | null
) => {
  const res = await authAxios(token).post(requests.postComment, {
    text: text,
    reply_id: reply_id,
    id: postID,
  });
  return res;
};

export const addPostToSaved = async (token: string | null, postID: number) => {
  const res = await authAxios(token).post(requests.postSaved, {
    id: postID,
  });
  return res;
};

export const deletePostFromSaved = async (
  token: string | null,
  postID: number
) => {
  const res = await authAxios(token).delete(requests.postSaved, {
    data: {
      id: postID,
    },
  });
  return res;
};

export const postCreateService = async (
  token: string | null,
  data: FormData
) => {
  const res = await authAxios(token).post(requests.postCreate, data);
  return res;
};

export const fetchUserProfilePostsService = async (
  token: string | null,
  username: string
) => {
  const res = await authAxios(token).get(
    requests.fetchUserProfilePosts(username)
  );
  return res;
};

export const fetchUserProfileSavedPostsService = async (
  token: string | null,
  username: string
) => {
  const res = await authAxios(token).get(
    requests.fetchUserProfileSavedPosts(username)
  );
  return res;
};
