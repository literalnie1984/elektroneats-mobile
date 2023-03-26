import { View, Text, Pressable } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { HeaderProps } from "../types";

const HeaderView = (props: HeaderProps) => {
  return (
    <View style={props.style}>
      <Text>K</Text>
      <Text style={props.titleStyle}>{props.title}</Text>
      <Pressable style={props.titleStyle} onPress={() => props.stackNavigation.navigate("DinnerView")}>
        <Text style={{ textAlign: "center" }}>Zamów{"\n"}(Debugging)</Text>
      </Pressable>
      <Pressable onPress={() => props.stackNavigation.navigate("AccountView")}>
        <Svg height={32} width={32}>
          <Circle cx={16} cy={16} r={16} fill={"pink"} />
          <SvgText x={16} y={20} textAnchor={"middle"} fontSize={16} stroke={"black"}>
            L
          </SvgText>
        </Svg>
      </Pressable>
    </View>
  );
};

export default HeaderView;
