import { useQueryClient } from "@tanstack/react-query";
import { TOKEN_KEY } from "./useToken";

export default function useLogoutMutation() {
  // TODO: Implement revocation on server-side.
  const queryClient = useQueryClient();
  return queryClient.setQueryData([TOKEN_KEY], undefined);
}
