import { View, Text, Button } from "react-native";
import { style } from "../../styles";
import { userTokenAtom } from "../utils/user";
import { useRecoilState } from "recoil";
import * as SecureStore from "expo-secure-store";

const AccountView = ({ navigation }: any) => {
  const [token] = useRecoilState(userTokenAtom);

  const logout = () => {
    SecureStore.deleteItemAsync("token");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={style.accountView}>
      <Text style={style.text}>{token}</Text>
      <Text style={style.text}>Account Profile Desc</Text>
      <Button title="Wyloguj się" onPress={logout} />
    </View>
  );
};

export default AccountView;
