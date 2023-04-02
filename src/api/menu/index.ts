import { fetchForJSON } from "../fetch";
import { ErrorFunction } from "../types";
import { DailyMenu, FetchedDinner, FetchedLastUpdate, WeeklyMenu } from "./types";
import { parseFetchedDinners } from "./utils";

const getWeeklyMenu = async (error?: ErrorFunction): Promise<WeeklyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[][]>({ path: "menu/", method: "GET", error });
  return data ? data.map((x) => parseFetchedDinners(x)) : data;
};

const getTodaysMenu = async (error?: ErrorFunction): Promise<DailyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[]>({ path: "menu/today", method: "GET", error });
  return data ? parseFetchedDinners(data) : data;
};

const getMenuByDay = async (day: number, error?: ErrorFunction): Promise<DailyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[]>({ path: `menu/day/${day}`, method: "GET", error });
  return data ? parseFetchedDinners(data) : data;
};

const getLastMenuUpdate = async (error?: ErrorFunction): Promise<FetchedLastUpdate | null> => (
  fetchForJSON<FetchedLastUpdate>({ path: "menu/last-update", method: "GET", error })
);

export default { getWeeklyMenu, getTodaysMenu, getMenuByDay, getLastMenuUpdate };
