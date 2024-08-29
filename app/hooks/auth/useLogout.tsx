import { useAtom } from "jotai";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserAtom, refreshTokenAtom, tokenAtom } from "../../core/auth";

export const useLogout = () => {
  const [, setToken] = useAtom(tokenAtom);
  const [, setRefreshToken] = useAtom(refreshTokenAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setCurrentUser(null);

    navigate("/login", { replace: true });
  }, [setToken, setRefreshToken, setCurrentUser, navigate]);

  return logout;
};
