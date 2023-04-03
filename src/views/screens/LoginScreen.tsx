import { View, Text, Keyboard, Alert, ToastAndroid, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import Button from "../../components/Button";
import Input from "../../components/Input";
import PressableText from "../../components/PressableText";
import Checkbox from "expo-checkbox";
import { COLORS } from "../colors";
import { loginUser } from "../../api";
import { UserLoginBody } from "../../api/user/types";
import { useRecoilState } from "recoil";
import { userTokensAtom } from "../utils/user";
import * as SecureStore from "expo-secure-store";
import { LoginScreenProps } from "../../types";
import { authStyle } from "../../styles";

const loginStyle = StyleSheet.create({
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  alignVertically: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forgottenPassBtn: {
    color: COLORS.darkerColar,
    fontWeight: "bold",
  },
  noAccountContainer: {
    color: COLORS.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

interface Errors {
  email: string | null;
  password: string | null;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [inputs, setInputs] = useState<UserLoginBody>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({ email: null, password: null });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [tokens, setTokens] = useRecoilState(userTokensAtom);

  const handleOnChange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMsg: string | null, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMsg }));
  };

  const validate = async () => {
    Keyboard.dismiss();

    let isValid = true;
    if (!inputs.email) {
      handleError("To pole jest wymagane", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Wprowadź poprawny adres email", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("To pole jest wymagane", "password");
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };

  const login = async () => {
    setIsLoading(true);
    let error = "";

    const data = await loginUser(inputs, (res) => {
      if(res === 'logout') return navigation.navigate('LoginScreen');
      console.log(res.status);

      switch (res.status) {
        case 400:
          error = "Logowanie nie powiodło się";
          break;
        case 500:
          error = "Wystąpił błąd serwera";
          break;
        default:
          error = `Wystąpił nieokreślony błąd (${res.status})`;
          break;
      }

      ToastAndroid.show(error, ToastAndroid.SHORT);
    });

    setIsLoading(false);

    if (data) {
      console.log(data);
      setTokens(data);
      if (rememberMe) await SecureStore.setItemAsync("tokens", JSON.stringify(tokens));
      navigation.navigate("TabsView");
    }
  };

  return (
    <View style={authStyle.container}>
      <Spinner visible={isLoading} />
      <View style={authStyle.innerContainer}>
        <Text style={authStyle.appName}>Kantyna App</Text>
        <Text style={{ ...authStyle.screenTitle, color: COLORS.darkGrey }}>Logowanie</Text>
        <Text style={authStyle.screenDescription}>Wprowadź swoje dane logowania</Text>
        <View style={{ marginVertical: 0 }}>
          <Input onChangeText={(text: string) => handleOnChange(text, "email")} onFocus={() => handleError(null, "email")} iconName="email-outline" label="Email" placeholder="Wprowadź adres email" errorMsg={errors.email} />
          <Input onChangeText={(text: any) => handleOnChange(text, "password")} onFocus={() => handleError(null, "password")} iconName="lock-outline" label="Hasło" placeholder="Wprowadź hasło" errorMsg={errors.password} password={true} />
          <View style={loginStyle.rememberMeContainer}>
            <Pressable style={{ ...loginStyle.alignVertically, justifyContent: "flex-start" }} onPress={() => setRememberMe(!rememberMe)}>
              <Checkbox value={rememberMe} onValueChange={setRememberMe} color={rememberMe ? COLORS.darkColar : undefined} />
              <Text style={{ marginLeft: 4 }}>Pamiętaj mnie</Text>
            </Pressable>
            {/* <PressableText
              title={"Zapomniałeś hasła?"}
              style={loginStyle.forgottenPassBtn}
              onPress={() => ToastAndroid.show("TODO", ToastAndroid.SHORT)}
            /> */}
          </View>
          <Button title="Zaloguj się" onPress={validate} />
          <Text onPress={() => navigation.navigate("RegistrationScreen")} style={loginStyle.noAccountContainer}>
            <View style={loginStyle.alignVertically}>
              <PressableText leftText={"Nie masz konta?"} title={"Zarejestruj się"} fontSize={16} style={authStyle.changeScreenButton} onPress={() => navigation.navigate("RegistrationScreen")} />
            </View>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
