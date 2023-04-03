import { View, Text, Pressable, Image } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useRecoilValue } from "recoil";
import { HeaderProps } from "../types";
import { userDataSelector } from "./utils/user";
import { API_URL } from "@env";

const HeaderView = (props: HeaderProps) => {
  const user_data = useRecoilValue(userDataSelector);
  console.log(user_data);

  return (
    <View style={props.style}>
      {/* <Text>K</Text> */}
      <Text style={props.titleStyle}>{props.title}</Text>
      {/* <Pressable onPress={() => props.stackNavigation.navigate("Account")}>
        <Svg height={32} width={32}>
          <Circle cx={16} cy={16} r={16} fill={"pink"} />
          <SvgText x={16} y={20} textAnchor={"middle"} fontSize={16} stroke={"black"}>
            {user_data?.username.charAt(0) ?? "X"}
          </SvgText>
        </Svg>
      </Pressable> */}
    </View>
  );
};

export default HeaderView;
