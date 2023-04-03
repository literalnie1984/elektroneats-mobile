import { View, Text, Pressable, Image } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import {useRecoilValue} from "recoil";
import { HeaderProps } from "../types";
import {userDataSelector} from "./utils/user";
import { API_URL } from "@env";
import AdaptiveIcon from "../../assets/adaptive-icon.png";

const baseURL = `${API_URL}/image/`
const iconUri = Image.resolveAssetSource(AdaptiveIcon).uri;

const HeaderView = (props: HeaderProps) => {
		const user_data = useRecoilValue(userDataSelector);
		console.log(user_data);
		
  return (
    <View style={props.style}>
      <Image source={{ uri: iconUri, scale: 1.0, }} resizeMode='contain' />
      <Text style={props.titleStyle}>{props.title}</Text>
      <Pressable onPress={() => props.stackNavigation.navigate("Account")}>
        <Svg height={32} width={32}>
          <Circle cx={16} cy={16} r={16} fill={"pink"} />
          <SvgText x={16} y={20} textAnchor={"middle"} fontSize={16} stroke={"black"}>
				{ user_data?.username.charAt(0) ?? 'X' }
          </SvgText>
        </Svg>
      </Pressable>
    </View>
  );
};

export default HeaderView;
