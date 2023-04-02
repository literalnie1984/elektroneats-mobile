import { View, Text, Keyboard, StyleSheet, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { COLORS } from "../colors";
import { useRecoilState } from "recoil";
import { userEmail } from "../utils/user";
import { authStyle } from "../../styles";
import { EmailConfirmationScreenProps } from "../../types";
import { verifyUser } from "../../api";

const emailStyle = StyleSheet.create({
  inputStyle: {
    fontSize: 18,
  },
  buttonStyle: {
    marginTop: 40,
  }
});

const EmailConfirmationScreen = ({ navigation }: EmailConfirmationScreenProps) => {
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email] = useRecoilState(userEmail);

  // Disables going back
  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
    });
  }, [navigation]);

  const validate = async () => {
    Keyboard.dismiss();

    let isValid = true;
    if (!code) {
      setError("To pole jest wymagane");
      isValid = false;
    } else if (code.length < 4) {
      setError("Wprowadzony kod jest za krótki");
      isValid = false;
    }

    if (isValid) {
      checkCode();
    }
  };

  const checkCode = async () => {
      if(!code) return;

      setIsLoading(true);
      
      let error = "";
      const data = await verifyUser(code, (res) => {
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

      if (data) {
        ToastAndroid.show("Weryfikacja przebiegła pomyślnie", ToastAndroid.SHORT);
        navigation.navigate("TabsView");
      } else ToastAndroid.show("Podany kod jest niepoprawny", ToastAndroid.SHORT);
  };

  return (
    <View style={authStyle.container}>
      <Spinner visible={isLoading} />
      <View style={authStyle.innerContainer}>
        <Text style={authStyle.appName}>Kantyna App</Text>
        <Text style={{ ...authStyle.screenTitle, color: COLORS.darkGrey, fontSize: 28 }}>Weryfikacja adresu email</Text>
        <Text style={{ ...authStyle.screenDescription, fontSize: 16, marginTop: 10 }}>Wprowadź kod, który został wysłany twoją pocztę</Text>
        <View style={{ marginVertical: 0 }}>
          <Input
            keyboardType={"number-pad"}
            onChangeText={(text: string) => setCode(text)}
            onFocus={() => setError(null)}
            iconName="dialpad"
            label="Kod"
            placeholder="Wprowadź kod"
            errorMsg={error}
            maxLength={4}
            autoFocus={true}
            style={emailStyle.inputStyle}
          />
          <Button title="Prześlij" style={emailStyle.buttonStyle} onPress={validate} />
        </View>
      </View>
    </View>
  );
};

export default EmailConfirmationScreen;
