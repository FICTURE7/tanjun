import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AUTH_KEY } from ".";
import { API_URL } from "../api";
import { saveAuth } from "../storage";
import Auth, { mapAuth } from "../models/Auth";

export interface RegisterData {
  username: string;
  password: string;
}

async function authRegister(data: RegisterData) {
  const response = await fetch(`${API_URL}/auth/register`, {
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

export default function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRegister,
    onSuccess: (data: Auth) => {
      queryClient.setQueryData([AUTH_KEY], data);
      saveAuth(data);
    }
  })
}
