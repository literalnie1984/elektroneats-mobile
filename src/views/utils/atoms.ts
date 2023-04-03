import { Settings } from "react-native";
import { atom } from "recoil";

export const settingsAtom = atom<Settings>({ key: "settings", default: undefined });
