import { fetchForStatus, fetchForText, fetchWithJWT } from "../fetch";
import { JWT } from "../types";
import { ChangePasswordBody, FetchedUserData, UserLoginBody, UserRegisterBody } from "./types";

const registerUser = async (body: UserRegisterBody): Promise<boolean> => {
  return await fetchForStatus({ path: `user/register`, method: "POST", body });
};

const loginUser = async (body: UserLoginBody): Promise<string | null> => {
  return await fetchForText({ path: `user/login`, method: "POST", body });
};

const getUserData = async (token: JWT): Promise<FetchedUserData | null> => {
  return await fetchWithJWT({ path: `user/get-user-data`, method: "GET", token });
};

const changeUsersPassword = async (token: JWT, body: ChangePasswordBody): Promise<FetchedUserData | null> => {
  return await fetchWithJWT({ path: `user/change-password`, method: "POST", token, body });
};

// TODO: /user/delete

export default { registerUser, loginUser, getUserData, changeUsersPassword };
