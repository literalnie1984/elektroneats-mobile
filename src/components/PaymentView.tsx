import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { parseDateToString } from "../views/tabs/CartView";
import { balanceAtom, walletAtom } from "../views/utils/wallet";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { getBalance } from "../api";
import { userTokensAtom } from "../views/utils/user";
import { Button } from "react-native";
import WalletFormView from "./WalletFormView";
import WalletTopUpView from "./WalletTopUpView";
import { ToastAndroid } from "react-native";
import WalletCheckout from "./WalletCheckout";
import { paymentStyle } from "../styles";

// Saldo i kwoty w GROSZACH!!!

const PaymentView = ({ navigation, route }: any) => {
  const [tokens] = useRecoilState(userTokensAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useRecoilState(walletAtom);
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const [currentView, setCurrentView] = useState("none");
  const [assumeSufficientBalance, setASB] = useState(false);

  const { orderBody, orderValue, pickupDate } = route.params;

  useEffect(() => {
    setCurrentView(determinePanel());
    setIsLoading(false);
  }, []);

  const Undisplay = async () => {
    if (!tokens) return "undisplay no tokens";

    getBalance(tokens?.accessToken, (res) => {
      console.log(res.status);
      //   console.log(res?.err ? res?.err.status : "pass");
    })
      .then((value) => {
        if (value !== null) {
          setBalance(value / 100);
        } else {
          ToastAndroid.show("Error during balance fetching occured", ToastAndroid.SHORT);
          setBalance(value);
        }
      })
      .then(() => determinePanel())
      .then((value) => setCurrentView(value))
      .then(() => setIsLoading(false));
  };

  const checkoutUndisplay = () => {
    navigation.navigate("Orders");
    setIsLoading(false);
    ToastAndroid.show("New order created!", ToastAndroid.SHORT);
  };

  const determinePanel = () => {
    if (!balance) return "determinePanel no balance";
    if (wallet) {
      if (balance >= orderValue || assumeSufficientBalance) {
        return "checkout";
      } else {
        return "topUp_info";
      }
    } else {
      return "walletForm_info";
    }
  };

  const loadedComponent = (
    <View style={paymentStyle.paymentRoot}>
      <View style={[paymentStyle.paymentHeader, { display: currentView.includes("info") ? "flex" : "none" }]}>
        <Text style={paymentStyle.paymentHeaderText}>{`Kwota operacji: ${orderValue.toFixed(2)}zł`}</Text>
        <Text style={paymentStyle.paymentHeaderText}>{`Data odbioru: ${parseDateToString(pickupDate)}`}</Text>
      </View>
      <View style={paymentStyle.paymentPanel}>
        <View style={[paymentStyle.paymentWalletInfoPanel, { display: currentView === "walletForm_info" ? "flex" : "none" }]}>
          <Text style={paymentStyle.paymentWalletInfoText}>Wygląda na to, że nie masz stworzonego portfela</Text>
          <Text style={paymentStyle.paymentWalletInfoText}>Stwórz go w celu kontynuowania transakcji</Text>
          <Button
            color={paymentStyle.paymentWalletInfoButton.color}
            onPress={() => {
              setCurrentView("walletForm");
            }}
            title={"Stwórz portfel"}
          />
        </View>
        <WalletFormView isDisplayed={currentView === "walletForm"} setIsLoading={setIsLoading} unDisplay={Undisplay} />
        <View style={[paymentStyle.paymentTopUpInfoPanel, { display: currentView === "topUp_info" ? "flex" : "none" }]}>
          <Text style={paymentStyle.paymentTopUpInfoText}>{`Twoje saldo: ${balance?.toFixed(2)}zł`}</Text>
          <Text style={paymentStyle.paymentTopUpInfoText}>{`Musisz zasilić konto kwotą co najmniej ${(orderValue - Number(balance)).toFixed(2)}zł`}</Text>
          <Button
            color={paymentStyle.paymentTopUpInfoButton.color}
            onPress={() => {
              setCurrentView("topUp");
            }}
            title={"Doładuj portfel"}
          />
        </View>
        <WalletTopUpView isDisplayed={currentView === "topUp"} setIsLoading={setIsLoading} isLoading={isLoading} unDisplay={Undisplay} balanceDiff={Number((orderValue - Number(balance)).toFixed(2))} />
        <WalletCheckout isDisplayed={currentView === "checkout"} setIsLoading={setIsLoading} body={orderBody} orderValue={Number((orderValue - Number(balance)).toFixed(2))} unDisplay={checkoutUndisplay} />
      </View>
    </View>
  );

  if (isLoading) return <Spinner color={paymentStyle.paymentSpinner.color} size={"large"} animation={"fade"} visible={isLoading} />;
  else return loadedComponent;
};

export default PaymentView;
