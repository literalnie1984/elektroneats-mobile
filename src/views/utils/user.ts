import { atom } from "recoil";

export const userTokenAtom = atom<string | null>({ key: "userToken", default: null });
export const userEmail = atom<string | null>({ key: "userEmail", default: null });
