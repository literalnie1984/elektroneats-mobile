import { ToastAndroid } from "react-native";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useRecoilState } from "recoil";
import { createOrders } from "../api";
import { paymentStyle } from "../styles";
import { WalletCheckoutProps } from "../types";
import { userTokensAtom } from "../views/utils/user";
import { balanceAtom } from "../views/utils/wallet";

const WalletCheckout = ({ isDisplayed, setIsLoading, body, orderValue, unDisplay }: WalletCheckoutProps) => {
  const [balance, __] = useRecoilState(balanceAtom);
  const [tokens, _] = useRecoilState(userTokensAtom);

  useEffect(() => {
    console.log(`Body: ${JSON.stringify(body)}`);
    console.log(`value: ${orderValue}`);
  }, []);

  const handleConfirm = async () => {
    console.log(JSON.stringify(body));
    setIsLoading(true);
    createOrders(body, tokens?.accessToken, (res) => {
      console.log(`${JSON.stringify(body)}`);
      if (res !== "logout") {
        console.log(res.status);
        console.log(res?.err?.status ?? res?.status);
        console.log(`${JSON.stringify(res.body)}`);
        res.text().then((value) => {
          console.log(value);
        });
      } else {
        console.log(res);
        console.log(res.length);
      }
    }).then((value) => {
      if (value) {
        unDisplay();
      } else {
        ToastAndroid.show("An error occured", ToastAndroid.SHORT);
        setIsLoading(false);
      }
    });
  };

  return (
    <View style={[paymentStyle.paymentCheckoutRoot, { display: isDisplayed ? "flex" : "none" }]}>
      <Text style={paymentStyle.paymentCheckoutText}>{`Obecne saldo: ${balance}zł`}</Text>
      <Text style={paymentStyle.paymentCheckoutText}>{`Saldo po transakcji: ${balance - orderValue}zł`}</Text>
      <Button onPress={handleConfirm} title={"Potwierdź transakcję"} color={paymentStyle.paymentCheckoutButton.color} />
    </View>
  );
};

export default WalletCheckout;
