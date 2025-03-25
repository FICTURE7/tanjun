import { useMutation } from "@tanstack/react-query";
import { mapPost } from "../models/Post";
import { API_URL } from "../api";

export interface PostDeleteData {
  token: string;
}

async function postDelete(id: number, data: PostDeleteData) {
  const response = await fetch(`${API_URL}/post/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': data.token
    }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return mapPost(result);
}

export default function usePostDeleteMutation(id: number) {
  return useMutation({
    mutationFn: (data: PostDeleteData) => postDelete(id, data)
  })
}
