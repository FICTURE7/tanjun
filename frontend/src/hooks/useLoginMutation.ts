import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AUTH_KEY } from ".";
import { API_URL } from "../api";
import Auth, { mapAuth } from "../models/Auth";
import { saveAuth } from "../storage";

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

  return mapAuth(result);
}

export default function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authLogin,
    onSuccess: (data: Auth) => {
      queryClient.setQueryData([AUTH_KEY], data);
      saveAuth(data);
    }
  });
}
