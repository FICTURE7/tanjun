import { useMutation } from "@tanstack/react-query";
import { mapPost } from "../models/Post";

export interface PostEditData {
  title: string;
  content: string;
}

async function postUpdate(id: number, data: PostEditData) {
  const response = await fetch(`http://localhost:8000/post/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-type': 'application/json'
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
  return useMutation({
    mutationFn: (data: PostEditData) => postUpdate(id, data)
  })
}
