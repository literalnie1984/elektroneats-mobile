import { fetchWithJWT } from "../fetch";
import { JWT } from "../types";
import { CreateOrdersBody } from "./types";

// TODO: create return types

const createOrders = async (token: JWT, body: CreateOrdersBody): Promise<unknown> => {
  return await fetchWithJWT({ path: `orders/create`, method: "POST", token, body });
};

const getPendingUserOrders = async (token: JWT): Promise<unknown> => {
  return await fetchWithJWT({ path: `orders/create`, method: "GET", token });
};

const getCompletedUserOrders = async (token: JWT): Promise<unknown> => {
  return await fetchWithJWT({ path: `orders/create`, method: "GET", token });
};

export default { createOrders, getPendingUserOrders, getCompletedUserOrders };
