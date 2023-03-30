export type JWT = string;

export interface FetchParams {
    path: string;
    method?: string;
    token?: JWT;
    body?: object;
    error?: Function;
}