import { formatURL } from "./utils";

export async function fetchForJSON<T>(path: string, error?: Function): Promise<T | null> {
  try {
    const url = formatURL(path);
    const res = await fetch(url);
    if (res.status !== 200) throw new Error();

    const data: T = await res.json();
    return data;
  } catch (err) {
    error?.();
    return null;
  }
}

interface FetchWithJWTParams {
  path: string;
  token: string;
  body?: object;
  method?: string;
  error?: Function;
}

export async function fetchWithJWT<T>({ path, token, method, body, error }: FetchWithJWTParams) {
  try {
    const url = formatURL(path);
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (res.status !== 200) return null;

    const data: T = await res.json();
    return data;
  } catch (err) {
    error?.();
    return null;
  }
}

interface FetchForTextParams {
  path: string;
  body: object;
  method?: string;
  error?: Function;
}

export async function fetchForText({ path, method, body, error }: FetchForTextParams): Promise<string | null> {
  try {
    const url = formatURL(path);
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status !== 200) throw new Error();

    const data = await res.text();
    return data;
  } catch (err) {
    error?.();
    return null;
  }
}

interface FetchForStatus {
  path: string;
  body: object;
  method?: string;
  error?: Function;
}

export async function fetchForStatus({ path, method, body, error }: FetchForStatus): Promise<boolean> {
  try {
    const url = formatURL(path);
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res.ok;
  } catch (err) {
    error?.();
    return false;
  }
}
