import { Picker } from "@react-native-picker/picker";

interface OptionSwitchProps {
  label: string;
  state: boolean;
  disabled: boolean;
  handleSwitch: (newValue: boolean) => void;
}

interface OptionSliderProps {
  label: string;
  value: number;
  disabled?: boolean;
  maxValue: number;
  minValue: number;
  step?: number;
  handleValueChange: (value: number) => void;
}

type PickerItem = {
  label: string;
  value: string | number;
  enabled?: boolean;
};

interface OptionPickerProps {
  label: string;
  state: string | number;
  stateModifier: (itemValue: string | number, itemPosition: number) => any;
  optionsList: PickerItem[];
  enabled?: boolean;
  mode?: "dialog" | "dropdown";
}

export { OptionSwitchProps, OptionSliderProps, OptionPickerProps, PickerItem };
