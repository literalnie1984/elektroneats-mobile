import { atom, useRecoilValue } from "recoil";
import { DailyMenu, DinnerItem, WeeklyMenu } from "../../api/menu/types";
import { CartItem, CartItemDinner, CartItemType, DinnerViewSelection } from "../../types";
import { menuSelector } from "./menu";
import { CreateOrdersBody, OrderBody } from "../../api/orders/types";

export const cartItemsAtom = atom<CartItem[]>({ key: "cartItems", default: [] });

const getPriceAsNumber = (item?: DinnerItem): number => {
    const convertedPrice = Number(item?.price);
    return !isNaN(convertedPrice) ? convertedPrice : 0;
}

const getId = (item?: DinnerItem): number | null => {
    return item?.id ? item.id : null;
}

export const calculateTotalCost = (selection: DinnerViewSelection, dailyMenu: DailyMenu) => {
    const findIndex = (sectionId: number, index: number) => {
        return selection.find(i => i[0] === sectionId && i[1] === index)?.[2] ?? -1
    }

    const mainDishPrice = getPriceAsNumber(dailyMenu.main[findIndex(0, 0)]);
    const fillerPrice = getPriceAsNumber(dailyMenu.extras.fillers[findIndex(1, 0)]);
    const saladPrice = getPriceAsNumber(dailyMenu.extras.salads[findIndex(1, 1)]);
    const beveragePrice = getPriceAsNumber(dailyMenu.extras.beverages[findIndex(1, 2)]);
    const soupPrice = findIndex(2, 0) !== -1 ? getPriceAsNumber(dailyMenu.soup) : 0;

    return (mainDishPrice + fillerPrice + saladPrice + beveragePrice + soupPrice);
}

export const convertSelectionToCartItem = (selection: DinnerViewSelection, dailyMenu: DailyMenu): CartItemDinner => {
    return {
        type: CartItemType.Dinner,
        cost: calculateTotalCost(selection, dailyMenu),
        amount: 1,
        data: { selection, weekday: dailyMenu.weekDay }
    }
}

const convertCartItemToOrderBody = (cartItem: CartItemDinner, dailyMenu: DailyMenu): OrderBody => {
    const findIndex = (sectionId: number, index: number) => {
        return cartItem.data.selection.find(i => i[0] === sectionId && i[1] === index)?.[2] ?? -1
    }
    
    const mainDishId = getId(dailyMenu.main[findIndex(0, 0)]);
    const fillerId = getId(dailyMenu.extras.fillers[findIndex(1, 0)]);
    const saladId = getId(dailyMenu.extras.salads[findIndex(1, 1)]);
    const beverageId = getId(dailyMenu.extras.beverages[findIndex(1, 2)]);
    const soupId = findIndex(2, 0) !== -1 ? getId(dailyMenu.soup) : 0;

    if(!mainDishId) throw 'err';

    const extrasIds = [];
    if(fillerId) extrasIds.push(fillerId);
    if(saladId) extrasIds.push(saladId);
    if(beverageId) extrasIds.push(beverageId);
    if(soupId) extrasIds.push(soupId);

    return { dinnerId: mainDishId, extrasIds }
}

export const convertCartItemsForApi = (menu: WeeklyMenu, cartItems: CartItem[], collectionDate: Date): CreateOrdersBody | null => {
    const dinners: OrderBody[] = [];
    cartItems.forEach((cartItem) => {
        if(cartItem.type === CartItemType.Item) return;

        const dailyMenu = menu[cartItem.data.weekday];
        dinners.push(convertCartItemToOrderBody(cartItem, dailyMenu));
    });

    const body = {
        dinners,
        collectionDate: Math.round(collectionDate.getTime() / 1000)
    };

    console.log(body.dinners);
    return body
}