import User, { mapUser } from "./User";

export default interface Post {
  id: number;
  author: User;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export function mapPost(data: any): Post {
  return {
    id: data.id,
    author: mapUser(data.author),
    title: data.title,
    content: data.content,
    createdAt: new Date(Date.parse(data.created_at)),
    updatedAt: data.updated_at && new Date(Date.parse(data.updated_at)),
  }
}
