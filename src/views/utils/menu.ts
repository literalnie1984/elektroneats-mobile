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

export const getDayOfWeek = (day: number) => {
  switch (day) {
    case 0:
      return "poniedziałek";
    case 1:
      return "wtorek";
    case 2:
      return "środę";
    case 3:
      return "czwartek";
    case 4:
      return "piątek";
    case 5:
      return "sobotę";
    default:
      return null;
  }
}