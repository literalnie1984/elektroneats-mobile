import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { optionSliderStyle } from "../styles/OptionComponentsStyles";
import { useState } from "react";
import { OptionSliderProps } from "../types/OptionComponentsTypes";
import { useRecoilState } from "recoil";
import { settingsAtom } from "../views/utils/atoms";

const OptionSlider = ({ label, tag, maxValue, minValue, step, value, disabled, handleValueChange }: OptionSliderProps) => {
  const [currentValue, setCurrentValue] = useState(value);
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

  const onValueChange = (value: number) => {
    setCurrentValue(value);
  };

  return (
    <View style={optionSliderStyle.body}>
      <Text style={optionSliderStyle.label}>{label}</Text>
      <Text style={optionSliderStyle.currentValue}>{currentValue}</Text>
      <Slider
        style={optionSliderStyle.slider}
        disabled={disabled || false}
        maximumValue={maxValue}
        minimumValue={minValue}
        minimumTrackTintColor={optionSliderStyle.minimumTrack.color}
        maximumTrackTintColor={optionSliderStyle.maximumTrack.color}
        thumbTintColor={optionSliderStyle.thumb.color}
        onSlidingComplete={handleChange}
        onValueChange={onValueChange}
        step={step || 1}
        value={value}
      />
    </View>
  );
};

export default OptionSlider;
