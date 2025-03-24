import { useQueryClient } from "@tanstack/react-query";
import { Auth } from "../models";

export const AUTH_KEY = 'AUTH';

export default function useAuth(): Auth | undefined {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<Auth>([AUTH_KEY]);
}
