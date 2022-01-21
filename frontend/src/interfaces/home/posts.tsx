import { ProfileInterface } from "../profile";

export interface StoryFieldIntf {
  id: number;
}

export interface UserFieldIntf {
  id: number;
  username: string;
  is_verified: boolean;
  profile: ProfileInterface;
  storys: StoryFieldIntf[] | [];
}

export interface UsersTagFieldIntf {
  username: string;
}

export interface UserLikesCommentViewerIntf {
  id: number;
  username: string;
  is_verified: boolean;
  profile: ProfileInterface;
}

export interface LikesFieldIntf {
  user: UserLikesCommentViewerIntf;
  liked_time: string;
}

export interface CommentsFieldIntf {
  id: number;
  text: string;
  user: UserLikesCommentViewerIntf;
  commented_time: string;
}

export interface ViewersFieldIntf {
  user: UserLikesCommentViewerIntf;
  viewed_time: string;
}

export interface FilesFieldIntf {
  created_time: string;
  file: string;
  id: number;
}

export interface SavedFieldIntf {
  id: number;
}

export interface PostFieldIntf {
  comments_count: number;
  created_time: string;
  description: string | null;
  edited: boolean;
  files: FilesFieldIntf[];
  id: number;
  likes_count: number;
  location: string | null;
  updated_time: string | null;
  user: UserFieldIntf;
  viewers_count: number;
  tags: string[] | [];
  users_tag: UsersTagFieldIntf | [];
  likes: LikesFieldIntf[];
  comments: CommentsFieldIntf[];
  viewers: ViewersFieldIntf[];
  saved: SavedFieldIntf[];
}

export interface PostIntf {
  loading: boolean;
  data: PostFieldIntf[] | [];
}
