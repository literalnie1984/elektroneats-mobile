import { View, Text, Switch } from "react-native";
import { useState } from "react";
import { optionSwitchStyle } from "../styles/OptionComponentsStyles";
import { OptionSwitchProps } from "../types/index";
import { useRecoilState } from "recoil";
import { settingsAtom } from "../views/utils/atoms";

const OptionSwitch = ({ label, state, tag, tagTrue, tagFalse, disabled, handleSwitch }: OptionSwitchProps) => {
  const [selected, setSelected] = useState(state);
  const [settings, setSettings] = useRecoilState(settingsAtom);

  const setSetting = (value: boolean) => {
    const newSettings = settings.map((setting) => {
      if (setting.tag === tag) {
        setting = { ...setting, value };
      }
      return setting;
    });

    setSettings(newSettings);
  };
  const handleChange = handleSwitch ?? setSetting;

  return (
    <View style={optionSwitchStyle.body}>
      <Text style={optionSwitchStyle.label}>{`${label}:`}</Text>
      <View style={optionSwitchStyle.switchBody}>
        <Text style={optionSwitchStyle.tag}>{tagFalse}</Text>
        <Switch
          style={optionSwitchStyle.switch}
          value={selected}
          onValueChange={(newValue: boolean) => {
            setSelected(newValue);
            handleChange(newValue);
          }}
          thumbColor={state ? optionSwitchStyle.switchEnabled.color : optionSwitchStyle.switchDisabled.color}
          trackColor={{ false: optionSwitchStyle.trackDisabled.color, true: optionSwitchStyle.trackEnabled.color }}
          disabled={disabled}
        />
        <Text style={optionSwitchStyle.tag}>{tagTrue}</Text>
      </View>
    </View>
  );
};

export default OptionSwitch;
