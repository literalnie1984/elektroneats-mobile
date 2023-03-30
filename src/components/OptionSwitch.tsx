import { View, Text, Switch } from "react-native";
import { useState } from "react";
import { optionSwitchStyle } from "../styles/OptionComponentsStyles";
import { OptionSwitchProps } from "../types/OptionComponentsTypes";

const OptionSwitch = ({ label, state, disabled, handleSwitch }: OptionSwitchProps) => {
  return (
    <View style={optionSwitchStyle.body}>
      <Text style={optionSwitchStyle.label}>{`${label}:`}</Text>
      <Switch
        style={optionSwitchStyle.switch}
        value={state}
        onValueChange={(newValue: boolean) => handleSwitch(newValue)}
        thumbColor={state ? optionSwitchStyle.switchEnabled.color : optionSwitchStyle.switchDisabled.color}
        trackColor={{ false: optionSwitchStyle.trackDisabled.color, true: optionSwitchStyle.trackEnabled.color }}
        disabled={disabled}
      />
    </View>
  );
};

export default OptionSwitch;
