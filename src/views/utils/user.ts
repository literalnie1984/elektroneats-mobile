import { atom, selector } from "recoil";

export const userTokenAtom = atom<string | null>({ key: "userToken", default: null });
export const userTokenSelector = selector({ 
    key: "userTokenGet",  
    get: ({ get }) => get(userTokenAtom) 
});
export const userEmail = atom<string | null>({ key: "userEmail", default: null });
