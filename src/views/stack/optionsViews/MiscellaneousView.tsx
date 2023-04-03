import { SectionList } from "react-native";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { miscellaneousViewStyle } from "../../../styles/OptionViewsStyles";
import OptionSwitch from "../../../components/OptionSwitch";
import { Settings } from "../../../types/OptionViewsTypes";
import { getSettingsByMenu, parseSettingsToComponents, settingsAtom, } from "../../utils/options";
import {useRecoilState} from "recoil";

const MiscellaneousOptionsView = ({ navigation, route }) => {
  const [settings, setSettings] = useRecoilState(settingsAtom);

  return (
    <View style={miscellaneousViewStyle.root}>
	{ parseSettingsToComponents( getSettingsByMenu("Pozostałe", settings) ) }
    </View>
  );
};

export default MiscellaneousOptionsView;
