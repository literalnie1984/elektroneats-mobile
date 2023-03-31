import { FetchParams } from "./types";
import { formatURL } from "./utils";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

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
    if (res.status !== 200) throw res;

    const data: T = await res.json();
    return data;
  } catch (err) {
    error?.();
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
    if (res.status !== 200) throw res;

    const data = await res.text();
    return data;
  } catch (err) {
    error?.();
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

    return res.ok;
  } catch (err) {
    error?.();
    return false;
  }
}
