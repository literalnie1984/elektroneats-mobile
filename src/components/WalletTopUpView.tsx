import {useEffect, useState} from "react";
import { View, Text, TextInput } from "react-native";
import Slider from "@react-native-community/slider";
import {useRecoilState} from "recoil";
import {balanceAtom, walletAtom} from "../views/utils/wallet";
import {Button} from "react-native";
import { InitPaymentSheetResult, PaymentSheetError, useStripe, StripeError } from "@stripe/stripe-react-native";
import {addBalance} from "../api";
import {userTokensAtom} from "../views/utils/user";
import {ToastAndroid} from "react-native";

const WalletTopUpView = ({ isDisplayed, balanceDiff, isLoading, setIsLoading, unDisplay }) => {
		const balanceDiffPLN: number = balanceDiff / 100;

		const [ tokens ] = useRecoilState(userTokensAtom);
		const [ chargeValue, setChargeValue ] = useState(balanceDiffPLN);
		const [ wallet ] = useRecoilState(walletAtom);
		const [ balance, setBalance ] = useRecoilState( balanceAtom );
		const { initPaymentSheet, presentPaymentSheet } = useStripe();

		useEffect(() => {
				if( chargeValue < balanceDiff ) setChargeValue( balanceDiff );
		}, [ chargeValue ]);

		const initializePayment = async () => {
				const customer_secret = await addBalance( tokens, chargeValue * 100, ( res ) => {
						!res.err ? console.log("Success") : console.log("Bruh")
				} ).then( ( value ) => console.log(value) );

				const { error }: Promise<InitPaymentSheetResult | StripeError<PaymentSheetError> > = await initPaymentSheet({
						merchantDisplayName: "Kantyna Elektronik",
						paymentIntentClientSecret: customer_secret,
						style: "automatic",
						defaultBillingDetails: {
								email: wallet?.email || "jan.kowalski@roksa.pl",
								phone: "391323456",
								name: wallet?.name || "Jan Kowalski",
						},
				});

				if(!error){
						setIsLoading(true);
				}
		}

		const openPaymentSheet = async () => {
				const { error } = await presentPaymentSheet();

				if( error ){
						ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG)
				} else {
						ToastAndroid.show("Success", ToastAndroid.LONG);
						isLoading(false);
				}
		};

		const handleConfirm = async () => {
				await initializePayment()
				.then( () => openPaymentSheet )
		};

		return( 
		<View style={[ { display: isDisplayed ? 'flex' : 'none' } ]}>
				<View>
						<Text>Podaj wartość doładowania: </Text>
						<TextInput
								value={ String(chargeValue) }
								onChangeText={ ( text ) => setChargeValue(Number( Number(text).toFixed(2))) }
								underlineColorAndroid={ "#000" }
								inputMode={ "numeric" }
								keyboardType={ "number-pad" }
						/>
				</View>
				<Slider
						minimumValue={balanceDiffPLN}
						lowerLimit={balanceDiffPLN}
						maximumValue={balanceDiffPLN + 200}
						upperLimit={balanceDiffPLN + 200}
						step={0.01}
						value={chargeValue}
						onValueChange={ (value) => setChargeValue(Number(value.toFixed(2))) }
				/>
				<Button
						onPress={ handleConfirm }
						title={ "Zatwierdź" }
						disabled={ isLoading }
				/>
		</View> 
		)
};

export default WalletTopUpView;
