import { View, Text } from "react-native";
import { useEffect } from "react";
import { lookAndFeelStyle } from "../../../styles/OptionViewsStyles";
import { getSettingsByMenu, parseSettingsToComponents } from "../../utils/options";
import { useRecoilState } from "recoil";
import { LookAndFeelViewProps } from "../../../types";
import { settingsAtom } from "../../utils/atoms";

const LookAndFeelView = ({ navigation, route }: LookAndFeelViewProps) => {
  const [settings, setSettings] = useRecoilState(settingsAtom);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
    });
  }, []);

  const children = parseSettingsToComponents(getSettingsByMenu("Wygląd", settings));
  return <View style={lookAndFeelStyle.root}>{children}</View>;
};

export default LookAndFeelView;
