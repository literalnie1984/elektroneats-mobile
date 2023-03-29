import { MenuContent, MenuItem } from "../types";
import { API_URL } from "@env";

const getDayOfWeekMnemonic = (day: number) => {
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
      return undefined;
  }
};

export const getMenu = async function () {
  const week_days = [0, 1, 2, 3, 4, 5];
  const fetched_values: Array<Promise<MenuItem>> = [];
  const menu = [];

  week_days.map(async (week_day) => {
    fetched_values.push(
      fetch(`${API_URL}/api/menu/day/${week_day}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Response ok");
            return response.json();
          } else {
            console.log("Response bruh");
            return Promise.reject(null);
          }
        })
        .then((data) => {
             console.log(data);
          const fetchedData = data;
          const dateSignature = String(`${getDayOfWeekMnemonic(week_day)}`);
          const menuContent: MenuContent = {
            main: [],
            soup: [],
            extras: [],
            beverage: [],
          };
          for (let i = 0; i < fetchedData.length; i++) {
            if (fetchedData[i][0].type === "Main") {
              menuContent.main.push(fetchedData[i][0]);
              menuContent.extras.push(fetchedData[i][1]);
            } else {
              menuContent.soup.push(fetchedData[i][0]);
              menuContent.beverage.push(fetchedData[i][1]);
            }
          }
          return { dateSignature: dateSignature, menuContent: menuContent };
        })
        .catch((reason) => Promise.reject(reason))
    );
  });

  for (let i = 0; i < fetched_values.length; i++) {
    menu[i] = await fetched_values[i];
  }

  return menu;
};

export const fetchMenu = async () => {
  return await getMenu();
};
export const debugParseMenuJSON = async () => JSON.stringify(await fetchMenu());
