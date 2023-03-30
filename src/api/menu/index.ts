import { fetchForJSON } from "../fetch";
import { DailyMenu, FetchedDinner, WeeklyMenu } from "./types";
import { parseFetchedDinners } from "./utils";

const getWeeklyMenu = async (): Promise<WeeklyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[][]>(`menu/`);
  return data ? data.map((x) => parseFetchedDinners(x)) : data;
};

const getTodaysMenu = async (): Promise<DailyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[]>(`menu/today`);
  return data ? parseFetchedDinners(data) : data;
};

const getMenuByDay = async (day: number): Promise<DailyMenu | null> => {
  const data = await fetchForJSON<FetchedDinner[]>(`menu/day/${day}`);
  return data ? parseFetchedDinners(data) : data;
};

export default { getWeeklyMenu, getTodaysMenu, getMenuByDay };
