import { SetStateAction, useEffect, useState, Dispatch } from "react";
import { ToastAndroid, Text, TextInput, View, Pressable } from "react-native";
import { paymentStyle } from "../styles";
import { verifyNameIntegrity, verifyPostalIntegrity, verifyPhoneNumberIntegrity, verifyEmailAddressIntegrity, walletAtom, balanceAtom } from "../views/utils/wallet";
import { COLORS } from "../views/colors";
import { getBalance, getClientData, setWallet } from "../api";
import { useRecoilState } from "recoil";
import { userTokensAtom } from "../views/utils/user";
import { WalletFormViewProps } from "../types";
import { WalletDetails } from "../api/wallet/types";

const emptyForm: WalletDetails = {
  name: "",
  phone: "",
  address: {
    city: "",
    country: "",
    postal_code: "",
    state: "",
  },
};

const trimWalletValues = (walletForm: WalletDetails, setWalletForm: Dispatch<SetStateAction<WalletDetails>>) => {
  setWalletForm({
    name: walletForm.name.trim(),
    phone: walletForm.phone.trim(),
    address: {
      city: walletForm.address.city.trim(),
      postal_code: walletForm.address.postal_code.trim(),
      state: walletForm.address.state.trim(),
      country: walletForm.address.country.trim(),
    },
  });
};

const WalletFormView = ({ isDisplayed, setIsLoading, unDisplay }: WalletFormViewProps) => {
  const [tokens] = useRecoilState(userTokensAtom);
  const [walletForm, setWalletForm] = useState<WalletDetails>(emptyForm);
  const [_, setWalletAtom] = useRecoilState(walletAtom);

  const handleWalletFormSave = async () => {
    trimWalletValues(walletForm, setWalletForm);
    console.log(walletForm);
    if (verifyPhoneNumberIntegrity(walletForm.phone) && verifyPostalIntegrity(walletForm.address.postal_code) && verifyNameIntegrity(walletForm.name)) {
      setIsLoading(true);
      const isSet = await setWallet(tokens?.accessToken, walletForm, async (res) => {
        res?.err ? console.log("Bruh") : console.log("Success");
        console.log(res.status);
        await res.text().then((value) => console.log(value));
      });

      if (isSet) {
        const wallet = await getClientData(tokens?.accessToken, (res) => {
          console.log(res?.err);
        });

        if (wallet) {
          setWalletAtom(wallet);
          ToastAndroid.show("Success", ToastAndroid.SHORT);
          unDisplay();
        } else {
          console.log(wallet);
          ToastAndroid.show("Error during wallet forming occured", ToastAndroid.SHORT);
        }
      } else ToastAndroid.show("Failed to set wallet", ToastAndroid.SHORT);
      setIsLoading(false);
    } else {
      if (!verifyPhoneNumberIntegrity(walletForm.phone)) {
        ToastAndroid.show("Wprowadź prawidłowy numer telefonu!", ToastAndroid.LONG);
      } else if (!verifyNameIntegrity(walletForm.name)) {
        ToastAndroid.show("Wprowadź poprawne dane osobowe!", ToastAndroid.LONG);
      } else if (!verifyPostalIntegrity(walletForm.address.postal_code)) {
        ToastAndroid.show("Wprowadź prawidłowy kod pocztowy", ToastAndroid.LONG);
      }

      setWalletForm(emptyForm);
    }
  };

  return (
    <View style={[paymentStyle.paymentWalletRoot, { display: isDisplayed ? "flex" : "none" }]}>
      <View style={paymentStyle.paymentWalletRow}>
        <Text style={paymentStyle.paymentWalletRowLabel}>Imię i nazwisko: </Text>
        <TextInput
          autoComplete="name"
          underlineColorAndroid={COLORS.gunmetal}
          cursorColor={COLORS.gunmetal}
          inputMode="text"
          keyboardType="default"
          textAlign="center"
          onChangeText={(text) => {
            setWalletForm({ ...walletForm, name: text });
          }}
          style={paymentStyle.paymentWalletRowInput}
          value={walletForm.name}
        />
      </View>
      <View style={paymentStyle.paymentWalletRow}>
        <Text style={paymentStyle.paymentWalletRowLabel}>Numer telefonu: </Text>
        <TextInput
          autoComplete="tel"
          underlineColorAndroid={COLORS.gunmetal}
          inputMode="numeric"
          cursorColor={COLORS.gunmetal}
          keyboardType="phone-pad"
          textAlign="center"
          onChangeText={(text) => {
            setWalletForm({ ...walletForm, phone: text });
          }}
          style={paymentStyle.paymentWalletRowInput}
          value={walletForm.phone}
        />
      </View>
      <View style={[paymentStyle.paymentWalletAddressView, { display: isDisplayed ? "flex" : "none" }]}>
        <Text style={paymentStyle.paymentWalletAddresViewLabel}>Dane adresowe: </Text>
        <View style={paymentStyle.paymentWalletRow}>
          <Text style={paymentStyle.paymentWalletRowLabel}>Kod pocztowy: </Text>
          <TextInput
            autoComplete="postal-code"
            underlineColorAndroid={COLORS.gunmetal}
            inputMode="text"
            cursorColor={COLORS.gunmetal}
            keyboardType="numbers-and-punctuation"
            textAlign="center"
            onChangeText={(text) => {
              setWalletForm({ ...walletForm, address: { ...walletForm.address, postal_code: text } });
            }}
            style={paymentStyle.paymentWalletRowInput}
            value={walletForm.address.postal_code}
          />
        </View>
        <View style={paymentStyle.paymentWalletRow}>
          <Text style={paymentStyle.paymentWalletRowLabel}>Miasto: </Text>
          <TextInput
            autoComplete="postal-address-locality"
            underlineColorAndroid={COLORS.gunmetal}
            inputMode="text"
            cursorColor={COLORS.gunmetal}
            keyboardType="default"
            textAlign="center"
            onChangeText={(text) => {
              setWalletForm({ ...walletForm, address: { ...walletForm.address, city: text } });
            }}
            style={paymentStyle.paymentWalletRowInput}
            value={walletForm.address.city}
          />
        </View>
        <View style={paymentStyle.paymentWalletRow}>
          <Text style={paymentStyle.paymentWalletRowLabel}>Województwo: </Text>
          <TextInput
            autoComplete="postal-address-region"
            underlineColorAndroid={COLORS.gunmetal}
            cursorColor={COLORS.gunmetal}
            inputMode="text"
            keyboardType="default"
            textAlign="center"
            onChangeText={(text) => {
              setWalletForm({ ...walletForm, address: { ...walletForm.address, state: text } });
            }}
            style={paymentStyle.paymentWalletRowInput}
            value={walletForm.address.state}
          />
        </View>
        <View style={paymentStyle.paymentWalletRow}>
          <Text style={paymentStyle.paymentWalletRowLabel}>Państwo: </Text>
          <TextInput
            underlineColorAndroid={COLORS.gunmetal}
            autoComplete="postal-address-country"
            cursorColor={COLORS.gunmetal}
            inputMode="text"
            keyboardType="default"
            textAlign="center"
            onChangeText={(text) => {
              setWalletForm({ ...walletForm, address: { ...walletForm.address, country: text } });
            }}
            style={paymentStyle.paymentWalletRowInput}
            value={walletForm.address.country}
          />
        </View>
      </View>
      <View style={paymentStyle.paymentWalletButtonRow}>
        <Pressable
          onPress={() => handleWalletFormSave()}
          style={paymentStyle.paymentWalletButton}
          android_ripple={{
            color: "#fff",
            borderless: false,
            radius: 80,
            foreground: false,
          }}
        >
          <Text style={paymentStyle.paymentWalletButtonLabel}>Zapisz dane</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setWalletForm(emptyForm);
          }}
          style={paymentStyle.paymentWalletButton}
          android_ripple={{
            color: "#fff",
            borderless: false,
            radius: 110,
            foreground: false,
          }}
        >
          <Text style={paymentStyle.paymentWalletButtonLabel}>Wyzeruj wartość pól</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WalletFormView;
