export interface ProfileInterface {
  id: number;
  image: string;
  website: string | null;
  bio: string | null;
  similar_account_suggestions: boolean;
}

export interface ProfileImageInterface {
  image: string;
}
