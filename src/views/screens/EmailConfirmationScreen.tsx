import { View, Text, Keyboard, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { COLORS } from "../colors";
import { useRecoilState } from "recoil";
import { userEmail } from "../utils/user";

const EmailConfirmationScreen = ({ navigation }: any) => {
  useEffect(() => {
    ToastAndroid.show("TODO", ToastAndroid.SHORT);
  }, []);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e: any) => {
        e.preventDefault();
      }),
    [navigation]
  );

  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // TODO: use in request
  const [email] = useRecoilState(userEmail);

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

  const checkCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Spinner visible={isLoading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
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
        <Text style={{ color: COLORS.darkGrey, fontSize: 28, fontWeight: "bold" }}>Weryfikacja adresu email</Text>
        <Text style={{ color: COLORS.grey, fontSize: 16, marginTop: 10 }}>Wprowadź kod, który został wysłany twoją pocztę</Text>
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
            style={{
              fontSize: 18,
            }}
          />
          <Button title="Prześlij" style={{ marginTop: 40 }} onPress={validate} />
        </View>
      </View>
    </View>
  );
};

export default EmailConfirmationScreen;
