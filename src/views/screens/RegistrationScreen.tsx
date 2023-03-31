import React from "react";
import { View, Text, Keyboard, ScrollView, ToastAndroid } from "react-native";

import Button from "../../components/Button";
import Spinner from "react-native-loading-spinner-overlay";
import Input from "../../components/Input";
import { COLORS } from "../colors";
import PressableText from "../../components/PressableText";
import { registerUser } from "../../api";
import { UserRegisterBody } from "../../api/user/types";
import { userEmail } from "../utils/user";
import { useRecoilState } from "recoil";

interface Errors {
  email: string | null;
  username: string | null;
  password: string | null;
}

const RegistrationScreen = ({ navigation }: any) => {
  const [inputs, setInputs] = React.useState<UserRegisterBody>({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<Errors>({
    email: null,
    username: null,
    password: null,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = useRecoilState(userEmail);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("To pole jest wymagane", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Wprowadź poprawny adres email", "email");
      isValid = false;
    }

    if (!inputs.username) {
      handleError("To pole jest wymagane", "username");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("To pole jest wymagane", "password");
      isValid = false;
    } else if (inputs.password.length < 6) {
      handleError("Minimalna długość hasła wynosi 6 znaków", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const handleOnChange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMsg: string | null, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMsg }));
  };

  const register = async () => {
    setIsLoading(true);

    let error = "";
    const hasSucceed = await registerUser(inputs, async (res) => {
      const text = await res.text();
      console.log(res.status);
      console.log(text);

      switch (res.status) {
        case 400:
          error = "Rejestracja nie powiodło się";
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

    if (hasSucceed) {
      setEmail(inputs.email);
      navigation.navigate("EmailConfirmationScreen");
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Spinner visible={isLoading} />
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 45,
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 40,
            color: COLORS.chestnut,
          }}
        >
          Kantyna App
        </Text>
        <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: "bold" }}>Rejestracja</Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Wprowadź swoje dane aby się zarejestrować</Text>
        <View style={{ marginBottom: 0 }}>
          <Input onChangeText={(text: string) => handleOnChange(text, "email")} onFocus={() => handleError(null, "email")} iconName="email-outline" label="Email" placeholder="Wprowadź adres email" errorMsg={errors.email} />

          <Input onChangeText={(text: string) => handleOnChange(text, "username")} onFocus={() => handleError(null, "username")} iconName="account-outline" label="Imię i nazwisko" placeholder="Wprowadź imię i nazwisko" errorMsg={errors.username} />

          <Input onChangeText={(text: string) => handleOnChange(text, "password")} onFocus={() => handleError(null, "password")} iconName="lock-outline" label="Hasło" placeholder="Wprowadź hasło" errorMsg={errors.password} password={true} />

          <Button title="Zarejestruj się" style={{ marginTop: 40 }} onPress={validate} />
          <PressableText
            leftText={"Masz już konto?"}
            title={"Zaloguj się"}
            fontSize={16}
            style={{
              color: COLORS.darkerColar,
              fontWeight: "bold",
            }}
            onPress={() => navigation.navigate("LoginScreen")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RegistrationScreen;
