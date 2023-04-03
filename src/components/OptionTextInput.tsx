import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { OptionTextInputProps } from "../types";
import { optionInputStyle } from "../styles/OptionComponentsStyles";
import { settingsAtom } from "../views/utils/options";
import { useRecoilState } from "recoil";

const OptionTextInput = ({ name, value, tag, handleValueChange, maxLen, disabled }: OptionTextInputProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [settings, setSettings] = useRecoilState(settingsAtom);

  const setSetting = (value: string) => {
    const newSettings = settings.map((setting) => {
      if (setting.tag === tag) {
        setting = { ...setting, value };
      }
      return setting;
    });

    setSettings(newSettings);
  };
  const handleChange = handleValueChange ?? setSetting;

  return (
    <View style={optionInputStyle.body}>
      <Text style={optionInputStyle.label}>{`${name}:`}</Text>
      <TextInput
        value={currentValue}
        onChangeText={(value: string) => {
          if (value.length > maxLen) return;
          else setCurrentValue(value);
          handleChange(value);
        }}
        keyboardType={"default"}
        textAlign={"center"}
        cursorColor={optionInputStyle.cursor.color}
        underlineColorAndroid={optionInputStyle.underline.color}
        editable={disabled}
        style={optionInputStyle.input}
      />
    </View>
  );
};

export default OptionTextInput;
