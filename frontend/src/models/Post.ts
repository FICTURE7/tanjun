import { User } from "./User";

export interface Post {
  id: number;
  author: User;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}
