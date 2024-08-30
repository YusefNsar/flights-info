import { atom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { User } from "../services/flightsApi";

export const currentUserAtom = atom<User | null>(null);

currentUserAtom.debugLabel = "currentUser";

export function useCurrentUser() {
  return useAtomValue(currentUserAtom);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localStorage as any,
  { getOnInit: true },
);
