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
  week_day: number;
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

export type FetchedDinner = {
  dinner: FetchedMeal;
  extras: FetchedExtra[];
};

export interface DinnerItem {
  id: number;
  name: string;
  price: string;
  uri: string;
}

export interface DailyMenu {
  week_day: number;
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
