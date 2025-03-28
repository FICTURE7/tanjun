import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post, { mapPost } from "../models/Post";
import { API_URL } from "../api";
import { POST_KEY } from "./usePostQuery";

export interface PostEditData {
  token: string;
  title: string;
  content: string;
}

async function postUpdate(id: number, data: PostEditData) {
  const response = await fetch(`${API_URL}/post/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': data.token
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return mapPost(result);
}

export default function usePostEditMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostEditData) => postUpdate(id, data),
    onSuccess(post: Post) {
      queryClient.setQueryData([POST_KEY, id], post);
    },
  })
}
