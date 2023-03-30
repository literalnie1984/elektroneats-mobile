import { GestureResponderEvent } from "react-native";
import { Pressable, Text } from "react-native";
import { optionButtonStyle } from "../styles/OptionComponentsStyles";

const OptionButton = ({ pressAction, longPressAction, label }: { pressAction: (event: GestureResponderEvent) => any; longPressAction?: (event: GestureResponderEvent) => any; label: string }) => {
  return (
    <Pressable
      style={optionButtonStyle.body}
      android_ripple={{
        color: "#b5c7fd",
        borderless: false,
        radius: 500,
        foreground: false,
      }}
      onPress={pressAction}
      onLongPress={
        longPressAction ||
        function () {
          null;
        }
      }
    >
      <Text style={optionButtonStyle.label}>{label}</Text>
    </Pressable>
  );
};

export default OptionButton;
