import { View, Text } from "react-native";
import { paymentSettingsStyle } from "../../../styles/OptionViewsStyles";

const PaymentSettingsView = ({ navigation }) => {
  return (
    <View style={paymentSettingsStyle.root}>
      <Text>Payment Settings View</Text>
    </View>
  );
};

export default PaymentSettingsView;
