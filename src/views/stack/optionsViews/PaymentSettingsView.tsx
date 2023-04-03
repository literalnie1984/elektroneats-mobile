import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { paymentSettingsStyle } from "../../../styles/OptionViewsStyles";
import { useRecoilState } from "recoil";
import { balanceAtom, walletAtom } from "../../utils/wallet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationCircle, faWallet } from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../colors";
import { PaymentSettingsViewProps } from "../../../types";
import { settingsAtom } from "../../utils/atoms";
import WalletFormView from "../../../components/WalletFormView";
import WalletTopUpView from "../../../components/WalletTopUpView";
import {userTokensAtom} from "../../utils/user";
import { getClientData, getBalance } from "../../../api";

const PaymentSettingsView = ({ navigation, route }: PaymentSettingsViewProps) => {
  const [settings, setSettings] = useRecoilState(settingsAtom);
  const [balance, setBalance] = useRecoilState(balanceAtom);
  const [wallet, setWallet] = useRecoilState(walletAtom);
  const [ tokens, _ ] = useRecoilState(userTokensAtom);
  const [ isPanelVisible, setIsPanelVisible ] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
    });
  }, []);

  const unDisplay = async () => {
	if(!tokens) return 'no maidens';
    getClientData(tokens?.accessToken, (res) => {
		if(res !== "logout") {
      console.log(res?.status ?? "logout");
       console.log(res?.err?.status ?? res?.status ?? "logout");
	   res.json().then( (value) => console.log(value) );
	   }
     })
    .then( (value) => setWallet(value) )
    .then( () => getBalance(tokens?.accessToken, (res) => {
		if(res !== "logout") {
      console.log(res?.status ?? "logout");
       console.log(res?.err?.status ?? res?.status ?? "logout");
	   res.json().then( (value) => console.log(value) );
	   }
     }))
      .then((value) => {
        if (value !== null) {
          setBalance(value / 100);
        } else {
          setBalance(value);
        }
      })
      .then(() => setIsPanelVisible(false))
  };

  return (
    <View style={paymentSettingsStyle.root}>
      {wallet ? (
        balance === null ? (<>
		<View style={[ paymentSettingsStyle.container, { display: isPanelVisible ? 'none' : 'flex' } ]}>
          <Text style={paymentSettingsStyle.header}>Brak środków na koncie!</Text>
		  <Pressable
            onPress={() => { setIsPanelVisible(true) }}
            style={paymentSettingsStyle.noWalletButton}
            android_ripple={{
              color: COLORS.whiteColar,
              foreground: false,
              borderless: false,
              radius: 100,
            }}
          >
            <Text style={paymentSettingsStyle.noWalletFooter}>Dodaj środki</Text>
          </Pressable>
		  </View>
		  <WalletTopUpView isDisplayed={isPanelVisible} setIsLoading={() => { console.log("XD") }} isLoading={false} unDisplay={unDisplay} balanceDiff={0} />
		  </>
        ) : (<>
		  <View style={[ paymentSettingsStyle.container, { display: isPanelVisible ? 'none' : 'flex' } ]}>
          <Text style={paymentSettingsStyle.header}>{`Dostępne środki: ${balance} zł`}</Text>
		  <Pressable
		    onPress={() => { setIsPanelVisible(true) }}
            style={paymentSettingsStyle.noWalletButton}
            android_ripple={{
              color: COLORS.whiteColar,
              foreground: false,
              borderless: false,
              radius: 100,
            }}
          >
            <Text style={paymentSettingsStyle.noWalletFooter}>Dodaj środki</Text>
          </Pressable>
        </View>
		<WalletTopUpView isDisplayed={isPanelVisible} setIsLoading={() => { console.log("XD") }} isLoading={false} unDisplay={unDisplay} balanceDiff={0} />
        </>)
		) : (
		<>
        <View style={[ paymentSettingsStyle.noWalletBody, { display: isPanelVisible ? 'none' : 'flex' } ]}>
          <Text style={paymentSettingsStyle.noWalletHeader}>Nie masz ustawionego porftela!</Text>
          <View style={paymentSettingsStyle.exclamationIcons}>
            <FontAwesomeIcon icon={faWallet} color={COLORS.saffron} size={120} />
            <FontAwesomeIcon icon={faExclamationCircle} color={COLORS.saffron} size={120} />
          </View>
          <Pressable
		    onPress={() => { setIsPanelVisible(true) }}
            style={paymentSettingsStyle.noWalletButton}
            android_ripple={{
              color: COLORS.whiteColar,
              foreground: false,
              borderless: false,
              radius: 100,
            }}
          >
            <Text style={paymentSettingsStyle.noWalletFooter}>Załóż portfel</Text>
          </Pressable>
        </View>
		<WalletFormView isDisplayed={isPanelVisible} setIsLoading={() => console.log("XD")} unDisplay={unDisplay} />
		</>
      )}
    </View>
  );
};

export default PaymentSettingsView;
