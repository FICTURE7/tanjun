import { useQueryClient } from "@tanstack/react-query";
import { Auth } from "../models";
import { loadAuth } from "../storage";

export const AUTH_KEY = 'AUTH';

export default function useAuth(): Auth | undefined {
  const queryClient = useQueryClient();
  const auth = queryClient.getQueryData<Auth>([AUTH_KEY]);

  if (!auth) {
    const loadedAuth = loadAuth();

    if (loadedAuth) {
      return queryClient.setQueryData<Auth>([AUTH_KEY], loadedAuth);
    }
  }

  return auth;
}
