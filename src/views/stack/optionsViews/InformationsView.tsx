import { View, Text } from "react-native";
import { useEffect } from "react";
import { informationsViewStyle } from "../../../styles/OptionViewsStyles";
import { InformationsViewProps } from "../../../types";

const InformationsView = ({ navigation, route }: InformationsViewProps) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
    });
  }, []);

  return (
    <View style={informationsViewStyle.root}>
      <Text>Informations View</Text>
    </View>
  );
};

export default InformationsView;
