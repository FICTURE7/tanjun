import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TOKEN_KEY } from "./useToken";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authLogin,
    onSuccess: (data: any) => {
      queryClient.setQueryData([TOKEN_KEY], data);
    }
  });
}
