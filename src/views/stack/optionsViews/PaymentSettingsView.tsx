import { View, Text, Modal, Pressable, } from "react-native";
import { useEffect, useState } from "react";
import { paymentSettingsStyle } from "../../../styles/OptionViewsStyles";
import {useRecoilState} from "recoil";
import {settingsAtom} from "../../utils/options";
import {balanceAtom, walletAtom} from "../../utils/wallet";
import OptionButton from "../../../components/OptionButton";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faExclamationCircle, faWallet} from "@fortawesome/free-solid-svg-icons";
import {COLORS} from "../../colors";

const PaymentSettingsView = ({ navigation, route }: any) => {
		const [ modalVisible, setModalVisible ] = useState(false);
		const [ settings, setSettings ] = useRecoilState(settingsAtom);
		const [ balance, setBalance ] = useRecoilState( balanceAtom );
		const [ wallet, setWallet ] = useRecoilState( walletAtom );
		useEffect(() => {
				navigation.setOptions({
						title: route.params.title,
				});
		}, []);
  return (
    <View style={paymentSettingsStyle.root}>
	{ wallet ? (
		balance ? (
				<Text style={ paymentSettingsStyle.noBalanceHeader }>Brak środków na koncie!</Text>
				) : (
						<Text style={ paymentSettingsStyle.header }>{`Dostępne środki: ${balance} zł`}</Text>
					) 
		) : ( 
				<View style={ paymentSettingsStyle.noWalletBody }>
						<Text style={ paymentSettingsStyle.noWalletHeader }>Nie masz ustawionego porftela!</Text>
						<View style={ paymentSettingsStyle.exclamationIcons }>
								<FontAwesomeIcon
										icon={ faWallet }
										color={ COLORS.saffron }
										size={ 120 }
								/>
								<FontAwesomeIcon
										icon={ faExclamationCircle }
										color={ COLORS.saffron }
										size={ 120 }
								/>
						</View>
						<Pressable
								style={ paymentSettingsStyle.noWalletButton }
								android_ripple={{
										color: COLORS.whiteColar,
										foreground: false,
										borderless: false,
										radius: 100,
								}}
						>
								<Text style={ paymentSettingsStyle.noWalletFooter }>Załóż portfel</Text>
						</Pressable>
				</View>
		) }
    </View>
  );
};

export default PaymentSettingsView;
