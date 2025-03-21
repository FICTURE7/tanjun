import User from "./User";

export default interface Post {
  id: number;
  author: User;
  title: string;
  content: string;
}
