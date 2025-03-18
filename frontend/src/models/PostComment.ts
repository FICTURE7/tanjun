import User from "./User";

export default interface PostComment {
  id: number;
  author: User;
  content: string;
  created_at: Date;
}
