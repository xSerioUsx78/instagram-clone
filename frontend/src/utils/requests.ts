import { endpoint } from "./server";

const requests = {
  register: `${endpoint}/users/register/`,
  login: `${endpoint}/users/login/`,
  logout: `${endpoint}/users/logout/`,
  getUser: `${endpoint}/users/user/`,
  getStorys: `${endpoint}/story/`,
  getPosts: `${endpoint}/post/`,
  getPostDetail: (postID: number) => `${endpoint}/post/${postID}/`,
  postLike: `${endpoint}/post/like/`,
  postComment: `${endpoint}/post/comment/`,
  postSaved: `${endpoint}/post/saved/`,
  commentLike: `${endpoint}/comment/like/`,
  fetchCommentReplies: (id: number) => `${endpoint}/comment/${id}/replies/`,
};

export default requests;
