import { FetchedDinnerItem, FetchedExtra, FetchedMeal } from "../menu/types";

export interface OrderBody {
  dinnerId: number;
  extrasIds: number[];
}

export interface CreateOrdersBody {
  dinners: OrderBody[];
  collectionDate: number;
}

export enum OrderStatus {
  Paid = "Paid",
  Prepared = "Prepared",
  Ready = "Ready",
  Collected = "Collected",
}

export interface FetchedOrder {
  orderId: number;
  collectionDate: number;
  status: OrderStatus;
  dinners: OrderBody[];
}

export interface FetchedOrders {
  response: FetchedOrder[];
  dinners: FetchedMeal[];
  extras: FetchedExtra[];
}

export interface OrderDinner {
  dinner: FetchedMeal;
  extras: FetchedExtra[];
}

export interface OrderData {
  id: number;
  status: OrderStatus;
  collectionDate: number;
  data: OrderDinner[];
}