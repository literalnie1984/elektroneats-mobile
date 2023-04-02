import { View, Text } from "react-native";
import { informationsViewStyle } from "../../../styles/OptionViewsStyles";

const InformationsView = ({ navigation }: any) => {
  return (
    <View style={informationsViewStyle.root}>
      <Text>Informations View</Text>
    </View>
  );
};

export default InformationsView;
