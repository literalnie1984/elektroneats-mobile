import { View, Text } from "react-native";
import { useEffect } from "react";
import { lookAndFeelStyle } from "../../../styles/OptionViewsStyles";
import { getSettingsByMenu, parseSettingsToComponents, settingsAtom } from "../../utils/options";
import { useRecoilState } from "recoil";
import { LookAndFeelViewProps } from "../../../types";

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
