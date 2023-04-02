import { atom, selector } from "recoil";
import { UserTokens } from "../../api/user/types";
import jwt_decode from "jwt-decode";
import { UserDecodedData } from "../../types";

export const userTokensAtom = atom<UserTokens | null>({ key: "userTokens", default: null });
export const userTokenSelector = selector({ 
    key: "userTokenGet",  
    get: ({ get }) => get(userTokensAtom)?.accessToken
});
export const userEmail = atom<string | null>({ key: "userEmail", default: null });

export const userDataSelector = selector({ 
    key: "userData",  
    get: ({ get }) => {
        const accessToken = get(userTokensAtom)?.accessToken;
        if(accessToken) jwt_decode(accessToken) as UserDecodedData;
        else return null;
    }
});

export const getErrorMsg = (statusCode: number) => {
    switch (statusCode) {
        case 400: return "Akcja nie powiodła się";
        case 500: return "Wystąpił błąd serwera";
        default: return `Wystąpił nieokreślony błąd (${statusCode})`;
    }
}