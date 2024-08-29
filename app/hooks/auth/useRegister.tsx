import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { currentUserAtom, refreshTokenAtom, tokenAtom } from "../../core/auth";
import { register, setAuthToken } from "../../services/flightsApi";

export const useRegister = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [, setRefreshToken] = useAtom(refreshTokenAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (args: Parameters<typeof register>) => register(...args),
    onSuccess: (data) => {
      const { token, refreshToken, ...user } = data;

      setToken(token);
      setRefreshToken(refreshToken);
      setCurrentUser(user);
      setAuthToken(token);

      enqueueSnackbar("Registration was successful", { variant: "success" });
      navigate("/dashboard", { replace: true });
    },
    onError(error) {
      console.error(error);
      const message = error.message || "Registration failed, please try again";
      enqueueSnackbar(message, {
        variant: "error",
      });
    },
  });

  return [registerMutation.mutate, registerMutation.isPending] as [
    typeof registerMutation.mutate,
    typeof registerMutation.isPending,
  ];
};
