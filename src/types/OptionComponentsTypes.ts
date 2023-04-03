import { Picker } from "@react-native-picker/picker";

interface OptionSwitchProps {
  label: string;
  tag: string;
  state: boolean;
  disabled: boolean;
  handleSwitch: (newValue: boolean) => void;
}

interface OptionSliderProps {
  label: string;
  tag: string,
  value: number;
  disabled?: boolean;
  maxValue: number;
  minValue: number;
  step?: number;
  handleValueChange?: (value: number) => void;
}

type PickerItem = {
  label: string;
  value: any;
  enabled?: boolean;
};

interface OptionPickerProps {
  label: string;
  tag: string,
  value: any,
  optionsList: PickerItem[];
  onValueChange?: ( value: any ) => any,
  enabled?: boolean;
  mode?: "dialog" | "dropdown";
}

export { OptionSwitchProps, OptionSliderProps, OptionPickerProps, PickerItem };
