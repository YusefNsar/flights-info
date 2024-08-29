/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import { atom, useAtomValue } from "jotai";
import { atomWithStorage, loadable } from "jotai/utils";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../services/flightsApi";
import { app } from "./firebase";

export const currentUserAtom = atom<User | null>(null);

currentUserAtom.debugLabel = "currentUser";

export function useCurrentUser() {
  return useAtomValue(currentUserAtom);
}

export const currentUserLoadable = loadable(currentUserAtom);

export function useCurrentUserLoadable() {
  return useAtomValue(currentUserLoadable);
}

export const tokenAtom = atomWithStorage<string | null>(
  "token",
  null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localStorage as any,
  { getOnInit: true },
);
export const refreshTokenAtom = atomWithStorage<string | null>(
  "refreshToken",
  null,
);

export function useSignIn(
  signInMethod: SignInMethod,
): [signIn: () => void, inFlight: boolean] {
  const navigate = useNavigate();
  const [inFlight, setInFlight] = useState(false);

  const signIn = useCallback(() => {
    let p: Promise<UserCredential> | null = null;

    if (signInMethod === "anonymous") {
      const auth = getAuth(app);
      p = signInAnonymously(auth);
    }

    if (signInMethod === "google.com") {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      provider.setCustomParameters({
        // login_hint: ...
        prompt: "consent",
      });
      p = signInWithPopup(auth, provider);
    }

    if (!p) throw new Error(`Not supported: ${signInMethod}`);

    setInFlight(true);
    p.then(() => navigate("/")).finally(() => setInFlight(false));
  }, [signInMethod, navigate]);

  return [signIn, inFlight] as const;
}

export type SignInMethod = "google.com" | "anonymous";
