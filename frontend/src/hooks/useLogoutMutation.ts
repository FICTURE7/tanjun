import { useQueryClient } from "@tanstack/react-query";
import { AUTH_KEY } from ".";

export default function useLogoutMutation() {
  // TODO: Implement revocation on server-side.
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: [AUTH_KEY] });
}
