import { fetchForJSON } from "../fetch";
import { ErrorFunction } from "../types";
import { FetchedLastUpdate, FetchedWeeklyMenu, WeeklyMenu } from "./types";
import { parseFetchedWeeklyMenu } from "./utils";

const getWeeklyMenu = async (error?: ErrorFunction): Promise<WeeklyMenu | null> => {
  const data = await fetchForJSON<FetchedWeeklyMenu>({ path: "menu/", method: "GET", error });
  return data ? parseFetchedWeeklyMenu(data) : data;
};

const getLastMenuUpdate = async (error?: ErrorFunction): Promise<FetchedLastUpdate | null> => (
  fetchForJSON<FetchedLastUpdate>({ path: "menu/last-update", method: "GET", error })
);

export default { getWeeklyMenu, getLastMenuUpdate };
