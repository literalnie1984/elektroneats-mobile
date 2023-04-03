export type JWT = string;

export type ErrorFunction = (res: Response | "logout") => void;
export interface FetchParams {
  path: string;
  method?: string;
  token?: JWT;
  body?: object;
  error?: ErrorFunction;
}
