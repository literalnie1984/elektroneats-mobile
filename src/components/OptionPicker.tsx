import { View, Text } from "react-native";
import { Picker, PickerItemProps } from "@react-native-picker/picker";
import { optionPickerStyle } from "../styles/OptionComponentsStyles";
import { PickerItem, OptionPickerProps } from "../types/OptionComponentsTypes";
import { useRef } from "react";

const generateItemList = (itemArray: PickerItem[]): JSX.Element[] => {
  const componentArray: JSX.Element[] = itemArray.map((item: PickerItem) => {
    return <Picker.Item label={item.label} value={item.value} enabled={Object.prototype.hasOwnProperty.call(item, "enabled") ? item.enabled : true} />;
  });

  return componentArray;
};

const OptionPicker = ({ label, state, stateModifier, optionsList, enabled, mode }: OptionPickerProps) => {
  const options = useRef(generateItemList(optionsList));
  console.log(optionsList.length);
  console.log(options.current.length);
  console.log(options.current[1]);

  return (
    <View style={optionPickerStyle.body}>
      <Text style={optionPickerStyle.label}>{label}</Text>
      <Picker
        style={optionPickerStyle.picker}
        selectedValue={state}
        onValueChange={stateModifier}
        enabled={enabled || true}
        mode={mode || "dropdown"}
        dropdownIconColor={optionPickerStyle.dropdownIcon.color}
        dropdownIconRippleColor={optionPickerStyle.dropdownRipple.color}
        itemStyle={optionPickerStyle.itemStyle}
      >
        {options.current}
      </Picker>
    </View>
  );
};

export default OptionPicker;
