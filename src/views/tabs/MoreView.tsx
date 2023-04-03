import { View, Text, Pressable } from "react-native";
import { moreViewStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPalette, faWallet, faEllipsis, faFingerprint, faInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { useRecoilState } from "recoil";
import { settingsAtom } from "../utils/atoms";

const options = [
  {
    name: "Wygląd",
    icon: faPalette,
    goto: "LookAndFeelView",
  },
  {
    name: "Płatności",
    icon: faWallet,
    goto: "PaymentSettingsView",
  },
  {
    name: "Zabezpieczenia",
    icon: faFingerprint,
    goto: "SecurityOptionsView",
  },
  {
    name: "Pozostałe",
    icon: faEllipsis,
    goto: "MiscellaneousView",
  },
  {
    name: "Informacje i autorzy",
    icon: faInfo,
    goto: "InformationsView",
  },
];

const OptionButton = (props: any) => {
  const navigation = useNavigation<RootStackParamList>();

  const [settings, setSettings] = useRecoilState(settingsAtom);

  return (
    <Pressable
      style={moreViewStyles.optionButton}
      onPress={() => navigation.navigate(props.goto, { title: props.optionName })}
      android_ripple={{
        color: "#9ab3fe",
        borderless: false,
        radius: 200,
        foreground: false,
      }}
    >
      <FontAwesomeIcon icon={props.optionIcon} color={moreViewStyles.optionButtonIcon.color} size={moreViewStyles.optionButtonIcon.width} />
      <Text style={moreViewStyles.optionButtonLabel}>{props.optionName}</Text>
    </Pressable>
  );
};

const MoreView = () => {
  return (
    <View style={moreViewStyles.root}>
      {options.map((option, index) => (
        <OptionButton key={index} optionName={option.name} optionIcon={option.icon} goto={option.goto} />
      ))}
    </View>
  );
};

export default MoreView;
