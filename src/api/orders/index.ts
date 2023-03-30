import { fetchForSuccess, fetchWithJWT } from "../fetch";
import { FetchedDinner } from "../menu/types";
import { JWT } from "../types";
import { CreateOrdersBody } from "./types";

const createOrders = async (token: JWT, body: CreateOrdersBody): Promise<boolean> => (
  fetchForSuccess({ path: `orders/create`, method: "POST", token, body })
);

const getPendingUserOrders = async (token: JWT): Promise<FetchedDinner[] | null> => (
  fetchWithJWT({ path: `orders/pending-user-orders`, method: "GET", token })
);

const getCompletedUserOrders = async (token: JWT): Promise<FetchedDinner[] | null> => (
  fetchWithJWT({ path: `orders/completed-user-orders`, method: "GET", token })
);

export default { createOrders, getPendingUserOrders, getCompletedUserOrders };
