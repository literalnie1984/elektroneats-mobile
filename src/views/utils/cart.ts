import { atom } from "recoil";
import { DailyMenu, DinnerItem, WeeklyMenu } from "../../api/menu/types";
import { CartItem, CartItemDinner, CartItemType, DinnerViewSelection } from "../../types";
import { CreateOrdersBody, OrderBody } from "../../api/orders/types";
import { getDayOfWeekMnemonic } from "../../api/utils";
import { Alert } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction } from "react";

export const cartItemsAtom = atom<CartItem[]>({ key: "cartItems", default: [] });

export const showDatePicker = (currentDate: Date | null, setDate: Dispatch<SetStateAction<Date | null>>, cartItems: CartItem[]) => {
  DateTimePickerAndroid.open({
    value: currentDate || new Date(),
    mode: "date",
    is24Hour: true,
    onChange: (event: DateTimePickerEvent, date?: Date | undefined) => {
      if (event.type === "set") {
        if (date) {
          if (date.getDay() === 0) {
            Alert.alert("Date error", "Date exceeds range Monday - Saturday", [{ text: "OK", onPress: () => console.log("ok") }], { cancelable: true });
            return;
          }
          if (!verifyPickupDates(cartItems, date)) {
            Alert.alert("Date error", "You cannot select this date: week days mismatch", [{ text: "OK", onPress: () => console.log("ok") }], { cancelable: true });
            return;
          }
          DateTimePickerAndroid.open({
            mode: "time",
            value: date,
            is24Hour: true,
            onChange: (event: DateTimePickerEvent, time?: Date | undefined) => {
              if (event.type === "set") {
                if (time) setDate(time);
              } else {
                Alert.alert("Date error", "Time picking dismissed", [{ text: "OK", onPress: () => console.log("ok") }], { cancelable: true });
                return;
              }
            },
          });
        }
      } else {
        Alert.alert("Date error", "Date picking dismissed", [{ text: "OK", onPress: () => console.log("ok") }], { cancelable: true });
        return;
      }
    },
  });
  return;
};

export const parseDateToString = (date: Date) => {
  let dateStr = "";
  dateStr += `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth()).padStart(2, "0")}.${date.getFullYear()} `;
  dateStr += `(${getDayOfWeekMnemonic(date.getDay())}) - `;
  dateStr += `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  return dateStr;
};

export const summarizeCost = (data: CartItem[]) => {
  if (data.length === 0) return 0;

  let cost = 0;
  data.map((item) => {
    if (!item) return;
    cost += item.cost * item.amount;
  });

  return cost;
};

export const verifyPickupDates = (data: CartItem[], newDate: Date) => {
  try {
    data.map((item) => {
      if (item.type === CartItemType.Dinner) {
        if (newDate.getDay() !== item.data.weekday + 1) {
          throw new Error("Week days mismatched");
        }
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

const getPriceAsNumber = (item?: DinnerItem): number => {
  const convertedPrice = Number(item?.price);
  return !isNaN(convertedPrice) ? convertedPrice : 0;
};

const getId = (item?: DinnerItem): number | null => {
  return item?.id ? item.id : null;
};

function generateId() {
  return Math.random().toString(36).substring(2) +
    (new Date()).getTime().toString(36);
}

export const calculateTotalCost = (selection: DinnerViewSelection, dailyMenu: DailyMenu) => {
  const findIndex = (sectionId: number, index: number) => {
    return selection.find((i) => i[0] === sectionId && i[1] === index)?.[2] ?? -1;
  };

  const mainDishPrice = getPriceAsNumber(dailyMenu.main[findIndex(0, 0)]);
  const fillerPrice = getPriceAsNumber(dailyMenu.extras.fillers[findIndex(1, 0)]);
  const saladPrice = getPriceAsNumber(dailyMenu.extras.salads[findIndex(1, 1)]);
  const beveragePrice = getPriceAsNumber(dailyMenu.extras.beverages[findIndex(1, 2)]);
  const soupPrice = findIndex(2, 0) !== -1 ? getPriceAsNumber(dailyMenu.soup) : 0;

  return mainDishPrice + fillerPrice + saladPrice + beveragePrice + soupPrice;
};

export const convertSelectionToCartItem = (selection: DinnerViewSelection, dailyMenu: DailyMenu): CartItemDinner => {
  return {
    id: generateId(),
    type: CartItemType.Dinner,
    cost: calculateTotalCost(selection, dailyMenu),
    amount: 1,
    data: { selection, weekday: dailyMenu.weekDay },
  };
};

const convertCartItemToOrderBody = (cartItem: CartItemDinner, dailyMenu: DailyMenu): OrderBody => {
  const findIndex = (sectionId: number, index: number) => {
    return cartItem.data.selection.find((i) => i[0] === sectionId && i[1] === index)?.[2] ?? -1;
  };

  const mainDishId = getId(dailyMenu.main[findIndex(0, 0)]);
  const fillerId = getId(dailyMenu.extras.fillers[findIndex(1, 0)]);
  const saladId = getId(dailyMenu.extras.salads[findIndex(1, 1)]);
  const beverageId = getId(dailyMenu.extras.beverages[findIndex(1, 2)]);
  const soupId = findIndex(2, 0) !== -1 ? getId(dailyMenu.soup) : 0;

  if (!mainDishId) throw "err";

  const extrasIds = [];
  if (fillerId) extrasIds.push(fillerId);
  if (saladId) extrasIds.push(saladId);
  if (beverageId) extrasIds.push(beverageId);
  if (soupId) extrasIds.push(soupId);

  return { dinnerId: mainDishId, extrasIds };
};

export const convertCartItemsForApi = (menu: WeeklyMenu, cartItems: CartItem[], collectionDate: Date): CreateOrdersBody | null => {
  const dinners: OrderBody[] = [];
  cartItems.forEach((cartItem) => {
    if (cartItem.type === CartItemType.Item) return;

    const dailyMenu = menu[cartItem.data.weekday];
    dinners.push(convertCartItemToOrderBody(cartItem, dailyMenu));
  });

  const body = {
    dinners,
    collectionDate: Math.round(collectionDate.getTime() / 1000),
  };

  console.log(body.dinners[0]);
  return body;
};
