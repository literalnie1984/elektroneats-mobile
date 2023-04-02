import { atom, selector } from "recoil";
import { UserTokens } from "../../api/user/types";

export const userTokensAtom = atom<UserTokens | null>({ key: "userTokens", default: null });
export const userTokenSelector = selector({ 
    key: "userTokenGet",  
    get: ({ get }) => get(userTokensAtom)?.accessToken
});
export const userEmail = atom<string | null>({ key: "userEmail", default: null });
