import { View, Text, Button } from "react-native";
import { style } from "../../styles";
import { userTokensAtom } from "../utils/user";
import { useRecoilState } from "recoil";
import * as SecureStore from "expo-secure-store";

const AccountView = ({ navigation }: any) => {
  const [tokens] = useRecoilState(userTokensAtom);

  const logout = () => {
    SecureStore.deleteItemAsync("tokens").then(() => {
      navigation.navigate("LoginScreen");
    });
  };

  return (
    <View style={style.accountView}>
      <Text style={style.text}>{JSON.stringify(tokens)}</Text>
      <Text style={style.text}>Account Profile Desc</Text>
      <Button title="Wyloguj się" onPress={logout} />
    </View>
  );
};

export default AccountView;
