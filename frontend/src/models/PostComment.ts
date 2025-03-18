import { User } from "./User";

export interface PostComment {
  id: number;
  author: User;
  content: string;
  created_at: Date;
}
