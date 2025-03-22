import { useQuery } from "@tanstack/react-query";
import { mapPost } from "../models/Post";

async function postGetList() {
  const response = await fetch('http://localhost:8000/post', { method: 'GET' });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return (result as any[]).map(mapPost);
}

export const POST_LIST_KEY = 'POST_LIST_KEY';

export default function usePostListQuery() {
  return useQuery({
    queryKey: [POST_LIST_KEY],
    queryFn: postGetList
  });
}
