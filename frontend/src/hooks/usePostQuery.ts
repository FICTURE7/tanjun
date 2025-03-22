import { useQuery } from "@tanstack/react-query";
import Post from "../models/Post";

export interface PostData {
  id: number;
}

async function postGet(data: PostData): Promise<Post> {
  const response = await fetch(`http://localhost:8000/post/${data.id}`, { method: 'GET' });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
}

export const POST_KEY = 'POST_KEY';

export default function usePostQuery(data: PostData) {
  return useQuery({
    queryKey: [POST_KEY, data.id],
    queryFn: () => postGet(data)
  });
}

