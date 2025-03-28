import { useCallback, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Auth, mapAuth } from "../models";
import { API_URL } from "../api";
import { jwtDecode } from 'jwt-decode';
import { loadAuth, saveAuth } from "../storage";

export const AUTH_KEY = 'AUTH';

interface RefreshData {
  token: string;
}

async function authRefresh(data: RefreshData) {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Authorization': data.token }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return mapAuth(result);
}

function useRefreshMutation() {
  // TODO: The refresh mutation should check if the token has become stale since its invocation.
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authRefresh,
    onSuccess(data: Auth) {
      queryClient.setQueryData([AUTH_KEY], data);
      saveAuth(data);
    },
    onError(_: Error) {
      queryClient.removeQueries({ queryKey: [AUTH_KEY] });
      saveAuth(undefined);
    }
  });
}

export default function useAuth(): Auth | undefined {
  const queryClient = useQueryClient();
  const refreshMutation = useRefreshMutation();

  const checkTokenStorage = useCallback(() => {
    const state = queryClient.getQueryState<Auth>([AUTH_KEY]);

    if (!state) {
      const auth = loadAuth();

      if (auth) {
        queryClient.setQueryData([AUTH_KEY], auth);
      }
    }
  }, [queryClient]);

  const checkTokenExpiration = useCallback(async () => {
    const state = queryClient.getQueryState<Auth>([AUTH_KEY]);

    if (!state || !state.data || state.fetchStatus != 'idle') {
      return;
    }

    const auth = state.data;
    const token = jwtDecode(auth.token);

    const nowSeconds = Date.now() / 1000;

    // Refresh token if it is about to expire in 2 minutes
    if (token.exp! - nowSeconds < 120 && !refreshMutation.isPending) {
      refreshMutation.mutate({ token: auth.token });
    }
  }, [queryClient, refreshMutation]);

  useEffect(() => {
    let timeout = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(timeout);
  }, [checkTokenExpiration]);

  checkTokenStorage();
  checkTokenExpiration();

  return queryClient.getQueryData([AUTH_KEY]);
}
