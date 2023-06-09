import { Text, View, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { parseDateToString } from "../views/tabs/CartView";
import { balanceAtom, walletAtom } from "../views/utils/wallet";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { getBalance, getClientData } from "../api";
import * as SecureStore from "expo-secure-store";
import { userTokensAtom } from "../views/utils/user";
import { Button } from "react-native";
import WalletFormView from "./WalletFormView";
import WalletTopUpView from "./WalletTopUpView";
import { ToastAndroid } from "react-native";
import WalletCheckout from "./WalletCheckout";
import { paymentStyle } from "../styles";
import { cartItemsAtom } from "../views/utils/cart";
import { cartWeekdayAtom } from "../views/utils/atoms";

// Saldo i kwoty w GROSZACH!!!

const PaymentView = ({ navigation, route }: any) => {
  const [tokens] = useRecoilState(userTokensAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useRecoilState(walletAtom);
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const [currentView, setCurrentView] = useState("none");
  const [assumeSufficientBalance, setASB] = useState(false);
  const [cart, setCart] = useRecoilState(cartItemsAtom);
  const [week_day, setWeekDay] = useRecoilState(cartWeekdayAtom);

  const { orderBody, orderValue, pickupDate } = route.params;
  const logout = () => {
    SecureStore.deleteItemAsync("tokens").then(() => {
      navigation.navigate("LoginScreen");
    });
  };

  useEffect(() => {
    console.log(`Body: ${orderBody}`);
    console.log(`value: ${orderValue}`);
    console.log(`pickupDate: ${pickupDate.toString()}`);
    if (!tokens?.accessToken) {
      Alert.alert("Błąd konta", "Sesja wygasła, zaloguj się ponownie", [{ text: "OK", onPress: () => logout() }], {
        cancelable: false,
      });
    }
    setCurrentView(determinePanel());
    setIsLoading(false);
  }, []);

  const Undisplay = async () => {
    if (!tokens) return "no maidens";
    getClientData(tokens?.accessToken, (res) => {
      if (res !== "logout") {
        console.log(res?.status ?? "logout");
        console.log(res?.err?.status ?? res?.status ?? "logout");
        res.json().then((value) => console.log(value));
      }
    })
      .then((value) => setWallet(value))
      .then(() =>
        getBalance(tokens?.accessToken, (res) => {
          if (res !== "logout") {
            console.log(res?.status ?? "logout");
            console.log(res?.err?.status ?? res?.status ?? "logout");
            res.json().then((value) => console.log(value));
          }
        })
      )
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
    setIsLoading(false);
    setCart([]);
    setWeekDay(-1);
    Alert.alert("Dziękujemy za zakup!", "Nowe zamówienie zostało właśnie dodane, a my zajmiemy się jego realizacją :)", [{ text: "OK", onPress: () => navigation.navigate("Zamówienia") }], {
      cancelable: true,
      onDismiss: () => navigation.navigate("Zamówienia"),
    });
    ToastAndroid.show("New order created!", ToastAndroid.SHORT);
  };

  const determinePanel = () => {
    console.log(`Wallet: ${wallet === null ? null : { ...wallet }}`);
    if (wallet) {
      if (balance >= orderValue || assumeSufficientBalance) {
        return "checkout";
      } else if (balance === null || balance < orderValue) {
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
        <WalletCheckout isDisplayed={currentView === "checkout"} setIsLoading={setIsLoading} body={orderBody} orderValue={orderValue} unDisplay={checkoutUndisplay} />
      </View>
    </View>
  );

  if (isLoading) return <Spinner color={paymentStyle.paymentSpinner.color} size={"large"} animation={"fade"} visible={isLoading} />;
  else return loadedComponent;
};

export default PaymentView;
