import { Settings } from "react-native";
import { atom } from "recoil";

export const settingsAtom = atom<Settings>({ key: "settings", default: undefined });
export const cartWeekdayAtom = atom<number>({ key: "cartWeekday", default: -1 });