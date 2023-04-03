import { View, Text } from "react-native";
import { useEffect } from "react";
import { securitySettingsStyle } from "../../../styles/OptionViewsStyles";

const SecurityOptionsView = ({ navigation, route }: any) => {
		useEffect(() => {
				navigation.setOptions({
						title: route.params.title,
				});
		}, []);
  return (
    <View style={securitySettingsStyle.root}>
      <Text>Security Settings View</Text>
    </View>
  );
};

export default SecurityOptionsView;
