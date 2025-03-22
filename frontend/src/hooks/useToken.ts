import { useQueryClient } from "@tanstack/react-query";

export const TOKEN_KEY = 'TOKEN_KEY';

export default function useToken(): any {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([TOKEN_KEY]);
}
