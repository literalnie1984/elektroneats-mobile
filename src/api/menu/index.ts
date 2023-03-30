import { fetchForJSON } from "../fetch";
import { DailyMenu, FetchedDinner, WeeklyMenu } from "./types";
import { parseFetchedDinners } from "./utils";

const getWeeklyMenu = async (): Promise<WeeklyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[][]>({ path: "menu/", method: "GET" });
  return data ? data.map((x) => parseFetchedDinners(x)) : data;
};

const getTodaysMenu = async (): Promise<DailyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[]>({ path: "menu/today", method: "GET" });
  return data ? parseFetchedDinners(data) : data;
};

const getMenuByDay = async (day: number): Promise<DailyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[]>({ path: `menu/day/${day}`, method: "GET" });
  return data ? parseFetchedDinners(data) : data;
};

export default { getWeeklyMenu, getTodaysMenu, getMenuByDay };
