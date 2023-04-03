import { View, Text } from "react-native";
import { Picker, PickerItemProps } from "@react-native-picker/picker";
import { optionPickerStyle } from "../styles/OptionComponentsStyles";
import { PickerItem, OptionPickerProps } from "../types/OptionComponentsTypes";
import { useRef, useState } from "react";
import {setSetting, settingsAtom} from "../views/utils/options";
import {useRecoilState} from "recoil";

const generateItemList = (itemArray: PickerItem[]): JSX.Element[] => {
  const componentArray: JSX.Element[] = itemArray.map((item: PickerItem) => {
    return <Picker.Item label={item.label} value={item.value} enabled={item.enabled ?? true} />;
  });

  return componentArray;
};

const OptionPicker = ({ label, tag, value, onValueChange, optionsList, enabled, mode }: OptionPickerProps) => {
  const options = useRef(generateItemList(optionsList));
  console.log(optionsList.length);
  console.log(options.current.length);
  console.log(options.current[1]);

  const [ selectedOption, setSelectedOption ] = useState(value);
  const [ settings, setSettings ] = useRecoilState(settingsAtom);

  const setSetting = ( value: any ) => {
		  const newSettings = settings.map( setting => {
				if(setting.tag === tag){
						setting = { ...setting, value };
				} 
				return setting;
		});

		setSettings(newSettings);
  };
  const handleChange = onValueChange ?? setSetting;

  return (
    <View style={optionPickerStyle.body}>
      <Text style={optionPickerStyle.label}>{label}</Text>
      <Picker
        style={optionPickerStyle.picker}
        selectedValue={selectedOption}
        onValueChange={ ( item ) => { setSelectedOption(item); handleChange( item ); } }
        enabled={enabled ?? true}
        mode={mode ?? "dropdown"}
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
