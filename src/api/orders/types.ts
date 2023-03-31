export interface OrderBody {
  dinnerId: number;
  extrasIds: number[];
}

export interface CreateOrdersBody {
  dinners: OrderBody[];
  collectionDate: number;
}
