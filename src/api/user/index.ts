import { fetchForJSON, fetchForSuccess } from "../fetch";
import { ErrorFunction, JWT } from "../types";
import { ChangePasswordBody, FetchedUserData, UserLoginBody, UserRegisterBody, UserTokens } from "./types";

const registerUser = async (body: UserRegisterBody, error?: ErrorFunction): Promise<boolean> => (
    fetchForSuccess({ path: `user/register`, method: "POST", body, error })
);

const loginUser = async (body: UserLoginBody, error?: ErrorFunction): Promise<UserTokens | null> => (
    fetchForJSON({ path: `user/login`, method: "POST", body, error })
);

const getUserData = async (token: JWT): Promise<FetchedUserData | null> => (
    fetchForJSON({ path: `user/get-user-data`, method: "GET", token })
);

const changeUsersPassword = async (body: ChangePasswordBody, token: JWT): Promise<FetchedUserData | null> => (
    fetchForJSON({ path: `user/change-password`, method: "POST", token, body })
);

// TODO: /user/delete

export default { registerUser, loginUser, getUserData, changeUsersPassword };
