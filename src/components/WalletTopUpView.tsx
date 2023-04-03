import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { COLORS } from "../views/colors";
import { useRecoilState } from "recoil";
import { balanceAtom, walletAtom } from "../views/utils/wallet";
import { Button } from "react-native";
import { InitPaymentSheetResult, PaymentSheetError, useStripe, StripeError } from "@stripe/stripe-react-native";
import { addBalance } from "../api";
import { userTokensAtom } from "../views/utils/user";
import { ToastAndroid } from "react-native";
import { paymentStyle } from "../styles";
import { WalletTopUpViewProps } from "../types";

const WalletTopUpView = ({ isDisplayed, balanceDiff, isLoading, setIsLoading, unDisplay }: WalletTopUpViewProps) => {
  const balanceDiffPLN: number = balanceDiff / 100;

  const [tokens] = useRecoilState(userTokensAtom);
  const [chargeValue, setChargeValue] = useState(balanceDiffPLN);
  const [textValue, setTextValue] = useState("");
  const [wallet] = useRecoilState(walletAtom);
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    setChargeValue(Number(Number(textValue).toFixed(2)) * 100);
  }, [textValue]);

  const initializePayment = async () => {
    const intent_data = await addBalance(tokens?.accessToken, chargeValue, (res) => {
      console.log(res?.status);
      console.log(res?.err?.status);
    });

    console.log(intent_data);

    const { error }: Promise<InitPaymentSheetResult | StripeError<PaymentSheetError>> = await initPaymentSheet({
      merchantDisplayName: "Kantyna Elektronik",
      customerId: intent_data.customer_id,
      paymentIntentClientSecret: intent_data.intent_secret,
      style: "automatic",
      defaultBillingDetails: {
        email: wallet?.email || "jan.kowalski@roksa.pl",
        phone: "391323456",
        name: wallet?.name || "Jan Kowalski",
      },
    });

    if (!error) {
      setIsLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
      setBalance((balance ?? 0) + chargeValue);
      unDisplay();
    } else {
      ToastAndroid.show("Success", ToastAndroid.LONG);
      unDisplay();
    }
  };

  const handleConfirm = async () => {
    if (chargeValue < balanceDiffPLN) {
      ToastAndroid.show("Insufficient charge", ToastAndroid.SHORT);
      return;
    }
    await initializePayment().then(() => openPaymentSheet());
  };

  return (
    <View style={[paymentStyle.paymentTopUpRoot, { display: isDisplayed ? "flex" : "none" }]}>
      <View style={paymentStyle.paymentTopUpRow}>
        <Text style={paymentStyle.paymentTopUpText}>Podaj wartość doładowania: </Text>
        <TextInput
          value={textValue}
          onChange={(event) => {
            setTextValue(event.nativeEvent.text);
          }}
          underlineColorAndroid={COLORS.gunmetal}
          cursorColor={COLORS.gunmetal}
          inputMode={"numeric"}
          style={paymentStyle.paymentTopUpInput}
          keyboardType={"decimal-pad"}
        />
      </View>
      <Button onPress={handleConfirm} title={"Zatwierdź"} disabled={isLoading} color={paymentStyle.paymentTopUpButton.color} />
    </View>
  );
};

export default WalletTopUpView;
