import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post, { mapPost } from "../models/Post";
import { API_URL } from "../api";
import { POST_KEY } from "./usePostQuery";

export interface PostCreateData {
  token: string;
  title: string;
  content: string;
}

async function postCreate(data: PostCreateData) {
  const response = await fetch(`${API_URL}/post`, {
    method: 'POST',
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

export default function usePostCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCreate,
    onSuccess(post: Post) {
      queryClient.setQueryData([POST_KEY, post.id], post);
    },
  });
}
