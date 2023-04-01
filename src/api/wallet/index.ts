import { API_URL } from "@env";
import { fetchForJSON, fetchForSuccess, fetchForNumber } from "../fetch";
import {JWT} from "../types";
import { FetchedClient, WalletDetails } from "./types"; 

const getClientData = async ( token: JWT ): Promise< FetchedClient | null > => {
		return fetchForJSON({ path: "payment/details", method: "GET", token });
};

const setWallet = async ( token: JWT, details: WalletDetails ): Promise< boolean > => {
		return fetchForSuccess({ path: "payment/init", method: "POST", token, body: details });
};

const getBalance = async ( token: JWT ): Promise< number | null > => {
		return fetchForNumber({ path: "payment/balance", method: "GET", token })
};

const getPaymentSheetParams = async ( token: JWT ): Promise<any> => {
		return fetchForJSON({ path: "gdzieś gdzie PaymentSheet będzie", method: "GET", token })
};

export default { getClientData, getBalance, setWallet, getPaymentSheetParams };

