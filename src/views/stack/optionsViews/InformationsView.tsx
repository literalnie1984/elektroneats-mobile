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
      <Text style={informationsViewStyle.authorText}>Piotr Jakóbczyk</Text>
      <Text style={informationsViewStyle.authorText}>Marcel Maciaszczyk</Text>
      <Text style={informationsViewStyle.authorText}>Marcin Mikuła</Text>
      <Text style={informationsViewStyle.authorText}>Michał Mikuła</Text>
      <Text style={informationsViewStyle.authorText}>Piotr Skóra</Text>
    </View>
  );
};

export default InformationsView;
