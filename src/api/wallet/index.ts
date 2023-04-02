import { API_URL } from "@env";
import { fetchForJSON, fetchForSuccess, fetchForNumber } from "../fetch";
import { ErrorFunction, JWT } from "../types";
import { FetchedClient, WalletDetails } from "./types";

const getClientData = async (token: JWT, error?: ErrorFunction): Promise<FetchedClient | null> => {
  return fetchForJSON({ path: "payment/details", method: "GET", token, error });
};

const setWallet = async (token: JWT, body: WalletDetails, error?: ErrorFunction): Promise<boolean> => {
  return fetchForSuccess({ path: "payment/init", method: "POST", token, body, error });
};

const getBalance = async (token: JWT, error?: ErrorFunction): Promise<number | null> => {
  const wallet: FetchedClient | null = await fetchForJSON({ path: "payment/balance", method: "GET", token, error });
  console.log("Balance-Wallet: ");
  console.log(wallet);
  return wallet !== null ? wallet.balance : null;
};

const addBalance = async ( token: JWT, amount: number, error?: ErrorFunction ): Promise<any> => {
  return await fetchForJSON({ path: `payment/add-balance/${amount}`, method: "POST", token, error });
};

export default { getClientData, getBalance, setWallet, addBalance };
