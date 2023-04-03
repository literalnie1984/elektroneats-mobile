import { FetchedExtra } from "../menu/types";
import { FetchedOrders, OrderData, OrderDinner } from "./types";

export const parseOrdersToOrderDatas = (fetchedOrders: FetchedOrders | null): OrderData[] => {
    if(!fetchedOrders) return [];

    const orders: OrderData[] = [];
    fetchedOrders.response.forEach(order => {
        const fetchedDinners: OrderDinner[] = [];
        order.dinners.forEach(dinner => {
            const actualDinner = fetchedOrders.dinners.find(d => d.id === dinner.dinnerId);
            const actualExtras = dinner.extrasIds.map(e => fetchedOrders.extras.find(i => i.id === e));

            fetchedDinners.push({
                dinner: actualDinner!,
                extras: actualExtras as FetchedExtra[]
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