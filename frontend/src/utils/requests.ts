import { endpoint } from "./server";

const requests = {
  register: `${endpoint}/users/register/`,
  login: `${endpoint}/users/login/`,
  logout: `${endpoint}/users/logout/`,
  getUser: `${endpoint}/users/user/`,
  getUserInfo: (username: string) => `${endpoint}/users/info/${username}/`,
  followUser: `${endpoint}/users/follow/`,
  unFollowUser: `${endpoint}/users/unfollow/`,
  suggestions: `${endpoint}/users/suggestions`,
  getStorys: `${endpoint}/story/`,
  getPosts: `${endpoint}/post/`,
  getExplorePosts: `${endpoint}/post/explore/`,
  getPostDetail: (postID: number) => `${endpoint}/post/${postID}/`,
  fetchUserProfilePosts: (username: string) =>
    `${endpoint}/post/user/${username}/`,
  fetchUserProfileSavedPosts: (username: string) =>
    `${endpoint}/post/user/${username}/saved/`,
  postLike: `${endpoint}/post/like/`,
  postComment: `${endpoint}/post/comment/`,
  postSaved: `${endpoint}/post/saved/`,
  postCreate: `${endpoint}/post/create/`,
  commentLike: `${endpoint}/comment/like/`,
  fetchCommentReplies: (id: number) => `${endpoint}/comment/${id}/replies/`,
};

export default requests;
