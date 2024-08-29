import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { currentUserAtom, refreshTokenAtom, tokenAtom } from "../../core/auth";
import { login, setAuthToken } from "../../services/flightsApi";

export const useLogin = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [, setRefreshToken] = useAtom(refreshTokenAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (args: Parameters<typeof login>) => login(...args),
    onSuccess: (data) => {
      const { token, refreshToken, ...user } = data;

      setToken(token);
      setRefreshToken(refreshToken);
      setCurrentUser(user);
      setAuthToken(token);

      enqueueSnackbar("Logged in successfully", { variant: "success" });
      navigate("/dashboard", { replace: true });
    },
    onError(error) {
      console.error(error);
      const message = error.message || "Login failed, please try again";
      enqueueSnackbar(message, {
        variant: "error",
      });
    },
  });

  return [loginMutation.mutate, loginMutation.isPending] as [
    typeof loginMutation.mutate,
    typeof loginMutation.isPending,
  ];
};
