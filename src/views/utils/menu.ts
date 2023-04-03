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