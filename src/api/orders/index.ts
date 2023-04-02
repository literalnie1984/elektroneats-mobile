import { fetchForJSON, fetchForSuccess } from "../fetch";
import { FetchedDinner } from "../menu/types";
import { ErrorFunction, JWT } from "../types";
import { CreateOrdersBody } from "./types";

const createOrders = async (body: CreateOrdersBody, token: JWT, error?: ErrorFunction): Promise<boolean> => (
  fetchForSuccess({ path: `user/orders/create`, method: "POST", token, body, error })
);

const getPendingUserOrders = async (token: JWT, error?: ErrorFunction): Promise<FetchedDinner[] | null> => (
  fetchForJSON({ path: `user/orders/pending`, method: "GET", token, error })
);

const getCompletedUserOrders = async (token: JWT, error?: ErrorFunction): Promise<FetchedDinner[] | null> => (
  fetchForJSON({ path: `user/orders/completed`, method: "GET", token, error })
);

export default { createOrders, getPendingUserOrders, getCompletedUserOrders };
