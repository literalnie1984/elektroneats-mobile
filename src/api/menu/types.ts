export interface FetchedDinnerItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export enum FetchedMealType {
  Main = "Main",
  Soup = "Soup",
}

export interface FetchedMeal extends FetchedDinnerItem {
  weekDay: number;
  maxSupply: number;
  type: FetchedMealType;
}

export enum FetchedExtraType {
  Filler = "Filler",
  Salad = "Salad",
  Beverage = "Beverage",
}

export interface FetchedExtra extends FetchedDinnerItem {
  type: FetchedExtraType;
}

export interface FetchedDinner {
  dinners: FetchedMeal[];
  extras: FetchedExtra[];
}

interface FetchedSingleMenu {
  dinners: FetchedMeal[];
  extrasIds: number[];
}

export interface FetchedWeeklyMenu {
  response: FetchedSingleMenu[];
  extras: FetchedExtra[];
}

export interface DinnerItem {
  id: number;
  name: string;
  price: string;
  uri: string;
}

export interface DailyMenu {
  weekDay: number;
  main: DinnerItem[];
  soup: DinnerItem;
  extras: {
    fillers: DinnerItem[];
    salads: DinnerItem[];
    beverages: DinnerItem[];
  };
}

export type WeeklyMenu = DailyMenu[];

export interface FetchedLastUpdate {
  lastUpdate: number;
}
