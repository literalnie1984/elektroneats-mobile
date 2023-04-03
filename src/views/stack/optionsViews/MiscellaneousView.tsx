import { View } from "react-native";
import { miscellaneousViewStyle } from "../../../styles/OptionViewsStyles";
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
