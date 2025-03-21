import { useMutation } from "@tanstack/react-query";

export interface RegisterData {
  username: string;
  password: string;
}

async function authRegister(data: RegisterData) {
  const response = await fetch('http://localhost:8000/auth/register', {
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
