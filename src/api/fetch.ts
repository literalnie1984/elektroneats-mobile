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
