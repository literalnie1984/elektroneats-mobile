import { View, Text } from "react-native";
import { style } from "../../styles";

const AccountView = () => {
  return (
    <View style={style.accountView}>
      <Text style={style.text}>Account Profile Icon</Text>
      <Text style={style.text}>Account Profile Desc</Text>
    </View>
  );
};

export default AccountView;
