import { DinnerItem } from "../menu/types";
import { reduceProps } from "../utils";
import { FetchedOrders, OrderData, OrderDinner } from "./types";

export const parseOrdersToOrderDatas = (fetchedOrders: FetchedOrders | null): OrderData[] => {
    if(!fetchedOrders) return [];

    const orders: OrderData[] = [];
    fetchedOrders.response.forEach(order => {
        const fetchedDinners: OrderDinner[] = [];
        order.dinners.forEach(dinner => {
            const actualDinner = reduceProps(fetchedOrders.dinners.find(d => d.id === dinner.dinnerId)!);
            const actualExtras = dinner.extrasIds
                .map(e => fetchedOrders.extras.find(i => i.id === e))
                .map(e => e ? reduceProps(e) : null);

            fetchedDinners.push({
                dinner: actualDinner,
                extras: actualExtras.filter(e => e !== null) as DinnerItem[]
            });
        });

        orders.push({
            id: order.orderId,
            status: order.status,
            collectionDate: order.collectionDate,
            data: fetchedDinners,
        });
    });

    return orders;
};