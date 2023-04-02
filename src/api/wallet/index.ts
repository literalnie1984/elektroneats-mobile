import { API_URL } from "@env";
import { fetchForJSON, fetchForSuccess, fetchForNumber } from "../fetch";
import { ErrorFunction, JWT } from "../types";
import { FetchedClient, WalletDetails } from "./types";

const getClientData = async (token: JWT, error?: ErrorFunction): Promise<FetchedClient | null> => {
  return fetchForJSON({ path: "payment/details", method: "GET", token, error });
};

const setWallet = async (token: JWT, details: WalletDetails, error?: ErrorFunction): Promise<boolean> => {
  return fetchForSuccess({ path: "payment/init", method: "POST", token, body: details, error });
};

const getBalance = async (token: JWT, error?: ErrorFunction): Promise<number | null> => {
  return fetchForNumber({ path: "payment/balance", method: "GET", token, error });
};

const addBalance = async ( token: JWT, amount: number, error?: ErrorFunction ): Promise<any> => {
  return fetchForJSON({ path: `payment/add_balance/${amount}`, method: "POST", token, error });
};

export default { getClientData, getBalance, setWallet, addBalance };
