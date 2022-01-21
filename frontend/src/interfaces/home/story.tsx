import { ProfileInterface } from "../profile";

export interface nextStoryFieldsIntf {
  id: number,
}

export interface UserFieldIntf {
  id: number,
  username: string,
  is_verified: boolean,
  profile: ProfileInterface,
  next_story: nextStoryFieldsIntf | {}
}

export interface StoryIntf {
  loading: boolean,
  data: UserFieldIntf[] | []
};