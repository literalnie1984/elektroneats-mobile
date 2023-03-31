import { View, Text, Pressable } from "react-native";
import { moreViewStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPalette, faWallet, faEllipsis, faFingerprint, faInfo, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

const options = [
  {
    name: "Look and Feel",
    icon: faPalette,
    goto: "Look and Feel",
  },
  {
    name: "Payment Settings",
    icon: faWallet,
    goto: "Payment Settings",
  },
  {
    name: "Biometrics and Security",
    icon: faFingerprint,
    goto: "Biometrics and Security",
  },
  {
    name: "Miscellaneous",
    icon: faEllipsis,
    goto: "Miscellaneous",
  },
  {
    name: "Informations and Credits",
    icon: faInfo,
    goto: "Informations",
  },
];

const OptionButton = (props) => {
  const navigation = useNavigation<RootStackParamList>();

  return (
    <Pressable
      style={moreViewStyles.optionButton}
      onPress={() => navigation.navigate(props.goto)}
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
