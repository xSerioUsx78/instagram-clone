const routes = {
  login: "/accounts/login",
  register: "/accounts/register",
  resetPassword: "/accounts/password/reset",
  profile: "/profile",
  userProfile: (username: string) => `/${username}`,
  userProfileStr: "/:username",
  explore: "/explore",
  directInbox: "/direct/inbox",
  likedBy: (postID: number) => `/p/${postID}/liked_by`,
  tags: (tagName: string) => `${routes.explore}/tags/${tagName}`,
  postDetail: (postID: number) => `/p/${postID}`,
  postDetailStr: "/p/:id",
};

export default routes;
