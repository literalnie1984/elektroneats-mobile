import { API_URL } from "@env";
import { WeekdayNumber } from "./types";

// API_URL >> MUST << end with the slash!
export const formatURL = (path: string) => API_URL + path;

export const getDayOfWeekMnemonic = (day: WeekdayNumber) => {
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
