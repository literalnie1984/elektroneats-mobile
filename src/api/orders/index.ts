import { fetchForJSON, fetchForSuccess } from "../fetch";
import { FetchedDinner } from "../menu/types";
import { ErrorFunction, JWT } from "../types";
import { CreateOrdersBody } from "./types";

const createOrders = async (body: CreateOrdersBody, token: JWT, error?: ErrorFunction): Promise<boolean> => (
  fetchForSuccess({ path: `orders/create`, method: "POST", token, body, error })
);

const getPendingUserOrders = async (token: JWT, error?: ErrorFunction): Promise<FetchedDinner[] | null> => (
  fetchForJSON({ path: `orders/pending-user-orders`, method: "GET", token, error })
);

const getCompletedUserOrders = async (token: JWT): Promise<FetchedDinner[] | null> => (
  fetchForJSON({ path: `orders/completed-user-orders`, method: "GET", token })
);

export default { createOrders, getPendingUserOrders, getCompletedUserOrders };
