import { API_URL } from "@env";
import { DinnerItem, FetchedDinnerItem } from "./menu/types";

// API_URL >> MUST << end with the slash!
export const formatURL = (path: string) => API_URL + path;

export const getDayOfWeekMnemonic = (day: number) => {
  switch (day) {
    case 0:
      return "Poniedziałek";
    case 1:
      return "Wtorek";
    case 2:
      return "Środa";
    case 3:
      return "Czwartek";
    case 4:
      return "Piątek";
    case 5:
      return "Sobota";
    default:
      return null;
  }
};

export const reduceProps = (obj: FetchedDinnerItem): DinnerItem => {
  return {
    id: obj.id,
    name: obj.name,
    price: obj.price,
    uri: obj.image,
  };
};