import { useMutation } from "@tanstack/react-query";
import { mapPost } from "../models/Post";
import { API_URL } from "../api";

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
  return useMutation({
    mutationFn: postCreate
  });
}
