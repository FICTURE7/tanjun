import { useMutation } from "@tanstack/react-query";
import { mapPost } from "../models/Post";

export interface PostCreateData {
  title: string;
  content: string;
}

async function postCreate(data: PostCreateData) {
  const response = await fetch('http://localhost:8000/post', {
    method: 'POST',
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
