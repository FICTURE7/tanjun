import { useQuery } from "@tanstack/react-query";
import Post from "../models/Post";

async function postGetList(): Promise<Post[]> {
  const response = await fetch('http://localhost:8000/post', {
    method: 'GET',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
}

export const POST_LIST = 'POST_LIST_KEY';

export default function usePostListQuery() {
  return useQuery({
    queryKey: [POST_LIST],
    queryFn: postGetList
  });
}
