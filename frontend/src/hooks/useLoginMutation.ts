import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../api";

export interface LoginData {
  username: string;
  password: string;
}

async function authLogin(data: LoginData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      username: data.username,
      password: data.password
    })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
}

export default function useLoginMutation() {
  return useMutation({
    mutationFn: authLogin
  });
}
