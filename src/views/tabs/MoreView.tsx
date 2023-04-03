import { View, Text, Pressable } from "react-native";
import { moreViewStyles } from "../../styles";
import { themeAtom } from "../utils/options";
import { getRecoil } from "recoil-nexus";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPalette, faWallet, faEllipsis, faFingerprint, faInfo, } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import {useRecoilState} from "recoil";
import {settingsAtom} from "../utils/options";

const options = [
  {
    name: "Wygląd",
    icon: faPalette,
    goto: "Look and Feel",
  },
  {
    name: "Ustawienia płatności",
    icon: faWallet,
    goto: "Payment Settings",
  },
  {
    name: "Biometria i zabezpieczenia",
    icon: faFingerprint,
    goto: "Biometrics and Security",
  },
  {
    name: "Pozostałe",
    icon: faEllipsis,
    goto: "Miscellaneous",
  },
  {
    name: "Informacje i autorzy",
    icon: faInfo,
    goto: "Informations",
  },
];

const OptionButton = (props: any) => {
  const navigation = useNavigation<RootStackParamList>();

  const [ settings, setSettings ] = useRecoilState(settingsAtom);

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
