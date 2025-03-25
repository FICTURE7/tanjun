import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mapPost } from "../models/Post";
import { API_URL } from "../api";
import { POST_KEY } from "./usePostQuery";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostDeleteData) => postDelete(id, data),
    onSuccess(_) {
      queryClient.removeQueries({ queryKey: [POST_KEY, id]})
    },
  })
}
