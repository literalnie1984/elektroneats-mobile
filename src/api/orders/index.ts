import { fetchForJSON, fetchForSuccess } from "../fetch";
import { FetchedDinner } from "../menu/types";
import { ErrorFunction, JWT } from "../types";
import { CreateOrdersBody, FetchedOrders, OrderData } from "./types";
import { parseOrdersToOrderDatas } from "./utils";

const createOrders = async (body: CreateOrdersBody, token: JWT, error?: ErrorFunction): Promise<boolean> => (
  fetchForSuccess({ path: `user/orders/create`, method: "POST", token, body, error })
);

// debug
// const fetchedOrders = {
//   "response": [
//     {
//       "orderId": 10,
//       "collectionDate": 1680531490,
//       "status": "Paid",
//       "dinners": [
//         {
//           "dinnerId": 2,
//           "extrasIds": [
//             4
//           ]
//         }
//       ]
//     },
//     {
//       "orderId": 1,
//       "collectionDate": 1680531490,
//       "status": "Collected",
//       "dinners": [
//         {
//           "dinnerId": 2,
//           "extrasIds": [
//             5
//           ]
//         }
//       ]
//     }
//   ],
//   "dinners":[{"id":2,"name":"stek w jajku","price":"15.00","image":"dstekwjajku.jpg","weekDay":0,"maxSupply":15,"type":"Main"}],
//   "extras":[
//     {"id":4,"name":"kasza","price":"1.00","image":"ekasza.jpg","type":"Filler"},
//     {"id":5,"name":"ryż","price":"1.00","image":"ery.jpg","type":"Filler"}
//   ]
// } as unknown as FetchedOrders;

const getOrders = async (token: JWT, error?: ErrorFunction): Promise<OrderData[] | null> => (
  // parseOrdersToOrderDatas(fetchedOrders)
  parseOrdersToOrderDatas(await fetchForJSON({ path: `user/orders/`, method: "GET", token, error }))
);

export default { createOrders, getOrders };
