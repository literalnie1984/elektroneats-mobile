import { fetchForJSON, fetchForText, fetchForSuccess } from "../fetch";
import { JWT } from "../types";
import { ChangePasswordBody, FetchedUserData, UserLoginBody, UserRegisterBody } from "./types";

const registerUser = async (body: UserRegisterBody): Promise<boolean> => (
  fetchForSuccess({ path: `user/register`, method: "POST", body })
);

const loginUser = async (body: UserLoginBody): Promise<string | null> => (
  fetchForText({ path: `user/login`, method: "POST", body })
);

const getUserData = async (token: JWT): Promise<FetchedUserData | null> => (
  fetchForJSON({ path: `user/get-user-data`, method: "GET", token })
);

const changeUsersPassword = async (body: ChangePasswordBody, token: JWT): Promise<FetchedUserData | null> => (
  fetchForJSON({ path: `user/change-password`, method: "POST", token, body })
);

// TODO: /user/delete

export default { registerUser, loginUser, getUserData, changeUsersPassword };
