import { View, Text } from "react-native";
import {useEffect} from "react";
import { informationsViewStyle } from "../../../styles/OptionViewsStyles";

const InformationsView = ({ navigation, route }) => {
		useEffect(() => {
				navigation.setOptions({
						title: route.params.title,
				});
		}, []);

  return (
    <View style={informationsViewStyle.root}>
      <Text>Informations View</Text>
    </View>
  );
};

export default InformationsView;
