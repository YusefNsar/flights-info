import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserAtom, refreshTokenAtom, tokenAtom } from "../../core/auth";
import {
  getCurrentUser,
  refreshAuthToken,
  setAuthToken,
} from "../../services/flightsApi";

export const useFetchCurrentUser = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["currentUser", token],
    queryFn: async () => {
      setAuthToken(token || "");
      const user = await getCurrentUser();

      setCurrentUser(user);

      return user;
    },
    retry: false,
    enabled: !!token,
    refetchInterval: 1000 * 60 * 10, // recheck token every 10 minutes
  });

  // try to refresh token before logging user out
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      setAuthToken(token || "");
      const newTokens = await refreshAuthToken(refreshToken || "");

      setToken(newTokens.token);
      setRefreshToken(newTokens.refreshToken);

      return newTokens;
    },
    onError: () => {
      enqueueSnackbar("Error fetching user data, redirecting to login", {
        variant: "error",
      });
      navigate("/login", { replace: true });
    },
    retry: false,
  });

  useEffect(() => {
    if (query.error && refreshTokenMutation.isIdle) {
      refreshTokenMutation.mutate();
    }
  }, [query.error, refreshTokenMutation]);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  return query;
};
