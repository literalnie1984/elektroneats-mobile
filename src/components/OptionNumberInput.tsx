import { View, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { OptionNumberInputProps } from "../types";
import { optionInputStyle } from "../styles/OptionComponentsStyles";
import { useRecoilState } from "recoil";
import { settingsAtom } from "../views/utils/atoms";

const OptionNumberInput = ({ name, value, tag, handleValueChange, maxVal, minVal, disabled }: OptionNumberInputProps) => {
  const [currentValue, setCurrentValue] = useState(value.toString());
  const [settings, setSettings] = useRecoilState(settingsAtom);

  const setSetting = (value: number) => {
    const newSettings = settings.map((setting) => {
      if (setting.tag === tag) {
        setting = { ...setting, value };
      }
      return setting;
    });

    setSettings(newSettings);
  };

  const handleChange = handleValueChange ?? setSetting;

  useEffect(() => {
    if (Number(currentValue) > maxVal || Number(currentValue) < minVal) {
      if (Number(currentValue) > maxVal) setCurrentValue(maxVal.toString());
      else if (Number(currentValue) < minVal) setCurrentValue(minVal.toString());
    }
  }, [currentValue]);

  return (
    <View style={optionInputStyle.body}>
      <Text style={optionInputStyle.label}>{`${name}:`}</Text>
      <TextInput
        value={currentValue}
        onChangeText={(value: string) => {
          if (Number.isNaN(value)) return;
          else setCurrentValue(value);
          handleChange(Number(value));
        }}
        keyboardType={"decimal-pad"}
        textAlign={"center"}
        cursorColor={optionInputStyle.cursor.color}
        underlineColorAndroid={optionInputStyle.underline.color}
        editable={disabled}
        style={optionInputStyle.input}
      />
    </View>
  );
};

export default OptionNumberInput;
