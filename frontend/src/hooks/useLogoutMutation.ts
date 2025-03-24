import { useQueryClient } from "@tanstack/react-query";
import { AUTH_KEY } from ".";
import { saveAuth } from "../storage";

export default function useLogoutMutation() {
  // TODO: Implement revocation on server-side.
  const queryClient = useQueryClient();

  queryClient.removeQueries({ queryKey: [AUTH_KEY] });
  saveAuth(undefined);
}
