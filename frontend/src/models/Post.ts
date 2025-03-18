import PostComment from "./PostComment";
import User from "./User";

export default interface Post {
  id: number;
  author: User;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  comments: PostComment[];
}
