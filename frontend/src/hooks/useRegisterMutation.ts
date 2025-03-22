import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../api";

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

  return result;
}

export default function useRegisterMutation() {
  return useMutation({
    mutationFn: authRegister
  })
}
