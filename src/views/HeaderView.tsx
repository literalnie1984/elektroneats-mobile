import { View, Text, Pressable } from "react-native";
import { HeaderProps } from "../types";

const HeaderView = (props: HeaderProps) => {
  return (
    <View style={props.style}>
      <Text>K</Text>
      <Text style={props.titleStyle}>{props.title}</Text>
      <Pressable onPress={() => props.stackNavigation.navigate("AccountView")}>
        <Text>L</Text>
      </Pressable>
    </View>
  );
};

export default HeaderView;
