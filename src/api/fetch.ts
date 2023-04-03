import { userTokensAtom } from "../views/utils/user";
import { ErrorFunction, FetchParams, JWT } from "./types";
import { ErrorRes, UserTokens } from "./user/types";
import { formatURL } from "./utils";
import { getRecoil, setRecoil } from "recoil-nexus";
import * as SecureStore from "expo-secure-store";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const refreshAccessToken = async (token: JWT, error?: ErrorFunction): Promise<UserTokens | null> => fetchForJSON({ path: `user/refresh-token`, method: "POST", token, error, body: { refreshToken: token } });

async function isAccessTokenValid(res: Response): Promise<boolean | undefined> {
  const logout = async () => {
    setRecoil(userTokensAtom, null);
    await SecureStore.deleteItemAsync("tokens");
    throw "logout";
  };

  if (res.status === 401) {
    const data: ErrorRes = await res.json();

    // if true then refresh accessToken
    if (data.error.includes("Access")) {
      const savedData = getRecoil(userTokensAtom);
      if (!savedData) return logout();

      const data = await refreshAccessToken(savedData.refreshToken);
      if (data) setRecoil(userTokensAtom, data);
      else return logout();

      return false;
    }

    // if true then force logout
    else if (data.error.includes("Refresh")) return logout();
  } else return true;
}

export async function fetchForJSON<T>({ path, method, token, body, error }: FetchParams): Promise<T | null> {
  try {
    const url = formatURL(path);
    console.log(`${method}: ${url}`);
    const res = await fetch(url, {
      method: method ?? "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!(await isAccessTokenValid(res))) fetchForJSON<T>({ path, method, token, body, error });
    if (res.status !== 200) throw res;

    const data: T = await res.json();
    return data;
  } catch (err) {
    error?.(err as Response);
    return null;
  }
}

export async function fetchForText({ path, method, token, body, error }: FetchParams): Promise<string | null> {
  try {
    const url = formatURL(path);
    console.log(`${method}: ${url}`);
    const res = await fetch(url, {
      method: method ?? "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!(await isAccessTokenValid(res))) fetchForText({ path, method, token, body, error });
    if (res.status !== 200) throw res;

    const data = await res.text();
    return data;
  } catch (err) {
    error?.(err as Response);
    return null;
  }
}

export async function fetchForNumber({ path, method, token, body, error }: FetchParams): Promise<number | null> {
  try {
    const url = formatURL(path);
    console.log(`${method}: ${url}`);
    const res = await fetch(url, {
      method: method ?? "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!(await isAccessTokenValid(res))) fetchForNumber({ path, method, token, body, error });
    if (res.status !== 200) throw res;

    const data = Number(await res.text());
    return data;
  } catch (err) {
    error?.(err as Response);
    return null;
  }
}

export async function fetchForSuccess({ path, method, token, body, error }: FetchParams): Promise<boolean> {
  try {
    const url = formatURL(path);
    console.log(`${method}: ${url}`);
    const res = await fetch(url, {
      method: method ?? "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!(await isAccessTokenValid(res))) fetchForSuccess({ path, method, token, body, error });

    return res.ok;
  } catch (err) {
    error?.(err as Response);
    return false;
  }
}
