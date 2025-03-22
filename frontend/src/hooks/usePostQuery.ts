import { useQuery } from "@tanstack/react-query";
import { mapPost } from "../models/Post";
import { API_URL } from "../api";

export interface PostData {
  id: number;
}

async function postGet(data: PostData) {
  const response = await fetch(`${API_URL}/post/${data.id}`, { method: 'GET' });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return mapPost(result);
}

export const POST_KEY = 'POST_KEY';

export default function usePostQuery(data: PostData) {
  return useQuery({
    queryKey: [POST_KEY, data.id],
    queryFn: () => postGet(data)
  });
}

