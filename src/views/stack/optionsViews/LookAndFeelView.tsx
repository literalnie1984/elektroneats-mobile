import { View, Text } from "react-native";
import { useEffect } from "react";
import { lookAndFeelStyle } from "../../../styles/OptionViewsStyles";
import {getSettingsByMenu, parseSettingsToComponents, settingsAtom} from "../../utils/options";
import {useRecoilState} from "recoil";

const LookAndFeelView = ({ navigation, route }) => {
		const [ settings, setSettings ] = useRecoilState(settingsAtom);
		useEffect(() => {
				navigation.setOptions({
						title: route.params.title,
				});
		}, []);
  return (
    <View style={lookAndFeelStyle.root}>
	{ parseSettingsToComponents( getSettingsByMenu( "Wygląd", settings ) ) }
    </View>
  );
};

export default LookAndFeelView;
