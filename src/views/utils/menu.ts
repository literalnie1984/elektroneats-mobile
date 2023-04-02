import { atom, selector } from "recoil";
import { DailyMenu, WeeklyMenu } from "../../api/menu/types";

export const menuAtom = atom<WeeklyMenu | null>({ key: "menu", default: null });
export const menuSelector = selector({ key: "menuGet", get: ({ get }) => get(menuAtom) });

export const generateVariantTags = function (dailyMenu: DailyMenu) {
  const variantCount = dailyMenu.main.length;
  const variantTags = [];
  for (let i = 1; i <= variantCount; i++) {
    variantTags.push(`Wariant ${i}`);
  }

  return variantTags;
};

// export const generateExtrasString = function (extras: Extras) {
//   let extras_string = "";
//   for (let i = 0; i < extras.length; i++) {
//     if (i < extras.length - 1) {
//       if (!extras_string.includes(extras[i][0]?.name)) {
//         extras_string += `${extras[i][0]?.name}, `;
//       }
//     } else {
//       if (!extras_string.includes(extras[i][0]?.name)) extras_string += `${extras[i][0]?.name}`;
//     }
//   }

//   if (extras_string.charAt(extras_string.length - 2) === ",") {
//     extras_string = extras_string.split(",")[0];
//   }

//   return extras_string;
// };

// export const generateBeverageString = function (beverage: Beverage) {
//   let isBeverage = false;
//   let beverageName;
//   for (let i = 0; i < beverage.length; i++) {
//     if (beverage[i].length !== 0) {
//       isBeverage = true;
//       beverageName = beverage[i][0]?.name;
//       break;
//     }
//   }

//   return beverageName || "brak";
// };
