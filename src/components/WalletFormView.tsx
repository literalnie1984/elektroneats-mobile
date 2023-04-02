import { useEffect, useState } from "react";
import { ToastAndroid, Text, TextInput, View, Pressable } from "react-native";
import { paymentViewStyle } from "../styles";
import { verifyNameIntegrity, verifyPostalIntegrity, verifyPhoneNumberIntegrity, verifyEmailAddressIntegrity, walletAtom, balanceAtom } from "../views/utils/wallet";
import { COLORS } from "../views/colors";
import { getBalance, getClientData, setWallet } from "../api";
import {useRecoilState} from "recoil";
import {userTokensAtom} from "../views/utils/user";

const emptyForm = {
		name: '', phone: '', address: {
		city: '', country: '', postal_code: '', 
		state: '', }
};

const trimWalletValues = ( walletForm, setWalletForm ) => {
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

const WalletFormView = ( { isDisplayed, setIsLoading, unDisplay } ) => {

		const [ tokens ] = useRecoilState(userTokensAtom);
		const [ walletForm, setWalletForm ] = useState( emptyForm );
		const [ _, setWalletAtom ] = useRecoilState(walletAtom);

		const handleWalletFormSave = async () => {
				trimWalletValues( walletForm, setWalletForm );
				console.log(walletForm);
				if(
								verifyPhoneNumberIntegrity( walletForm.phone ) &&
								verifyPostalIntegrity( walletForm.address.postal_code ) &&
								verifyNameIntegrity( walletForm.name )
				  ){
						setIsLoading(true);
						const isSet = await setWallet( tokens, walletForm, ( res ) => {
								res.err ? console.log("Bruh") : console.log("Success")
						} );
						
						if( isSet | !isSet ) {
								const wallet = await getClientData( tokens, ( res ) => {
										console.log(res?.err);
								} );
						
								if( wallet ) {
										setWalletAtom( wallet );
										ToastAndroid.show("Success", ToastAndroid.SHORT);
								} else {
										console.log( wallet );
										ToastAndroid.show("Error during wallet forming occured", ToastAndroid.SHORT)
								}
						} else ToastAndroid.show("Failed to set wallet", ToastAndroid.SHORT);
						setIsLoading( false );
						
				}
				else {
						if( !verifyPhoneNumberIntegrity( walletForm.phone ) ){
								ToastAndroid.show( "Wprowadź prawidłowy numer telefonu!", ToastAndroid.LONG );
						} else if ( !verifyNameIntegrity( walletForm.name ) ){
								ToastAndroid.show( "Wprowadź poprawne dane osobowe!", ToastAndroid.LONG );
						} else if ( !verifyPostalIntegrity( walletForm.address.postal_code ) ){
								ToastAndroid.show( "Wprowadź prawidłowy kod pocztowy", ToastAndroid.LONG);
						} 

						setWalletForm( emptyForm );
				}
		}

		return (
		<View style={[ paymentViewStyle.walletFormBody, { display: isDisplayed ? 'flex' : 'none', }, ]}>
				<View style={ paymentViewStyle.walletFormRow }>
				<Text style={ paymentViewStyle.walletFormRowLabel }>Imię i nazwisko: </Text>
						<TextInput 
						autoComplete='name'
						underlineColorAndroid={ COLORS.black }
						inputMode='text'
						keyboardType='default'
						textAlign='center'
						onChangeText={ ( text ) => { 
								setWalletForm( { ...walletForm, name: text } )
						} }
						style={ paymentViewStyle.walletFormRowInput }
						value={ walletForm.name }
						/>
				</View>
				<View style={ paymentViewStyle.walletFormRow }>
						<Text style={ paymentViewStyle.walletFormRowLabel } >Numer telefonu: </Text>
						<TextInput 
								autoComplete='tel'
								underlineColorAndroid={ COLORS.black }
								inputMode='numeric'
								keyboardType='phone-pad'
								textAlign='center'
								onChangeText={ ( text ) => { 
										setWalletForm( { ...walletForm, phone: text } )
								} }
								style={ paymentViewStyle.walletFormRowInput }
								value={ walletForm.phone }
						/>
				</View>
				{/*<View style={ paymentViewStyle.walletFormRow }>
						<Text style={ paymentViewStyle.walletFormRowLabel }>Adres email: </Text>
						<TextInput 
								autoComplete='email'
								underlineColorAndroid={ COLORS.black }
								inputMode='email'
								keyboardType='email-address'
								textAlign='center'
								onChangeText={ ( text ) => { 
										setWalletForm( { ...walletForm, email: text } )
								} }
								style={ paymentViewStyle.walletFormRowInput }
								value={ walletForm.email }
						/>
				</View>*/}
				<View style={ paymentViewStyle.walletFormAddressView }>
						<Text style={ paymentViewStyle.walletFormAddresViewLabel }>Dane adresowe: </Text>
						{ /* <View style={ paymentViewStyle.walletFormRow }>
								<Text style={ paymentViewStyle.walletFormRowLabel }>Linia adresu 1: </Text>
								<TextInput 
										autoComplete='postal-address'
										underlineColorAndroid={ COLORS.black }
										inputMode='text'
										keyboardType='default'
										textAlign='center'
										onChangeText={ ( text ) => { 
												setWalletForm( { ...walletForm, address_line: text } )
										} }
										style={ paymentViewStyle.walletFormRowInput }
										value={ walletForm.address_line }
								/>
						</View> */	}
						<View style={ paymentViewStyle.walletFormRow }>
								<Text style={ paymentViewStyle.walletFormRowLabel }>Kod pocztowy: </Text>
								<TextInput 
										autoComplete='postal-code'
										underlineColorAndroid={ COLORS.black }
										inputMode='text'
										keyboardType='numbers-and-punctuation'
										textAlign='center'
										onChangeText={ ( text ) => { 
												setWalletForm( { ...walletForm, address: { ...walletForm.address, postal_code: text }, } )
										} }
										style={ paymentViewStyle.walletFormRowInput }
										value={ walletForm.address.postal_code }
								/>
						</View>
						<View style={ paymentViewStyle.walletFormRow }>
								<Text style={ paymentViewStyle.walletFormRowLabel }>Miasto: </Text>
								<TextInput 
										autoComplete='postal-address-locality'
										underlineColorAndroid={ COLORS.black }
										inputMode='text'
										keyboardType='default'
										textAlign='center'
										onChangeText={ ( text ) => { 
												setWalletForm( { ...walletForm, address: { ...walletForm.address, city: text } } )
										} }
										style={ paymentViewStyle.walletFormRowInput }
										value={ walletForm.address.city }
								/>
						</View>
						<View style={ paymentViewStyle.walletFormRow }>
								<Text style={ paymentViewStyle.walletFormRowLabel }>Województwo: </Text>
								<TextInput 
										autoComplete='postal-address-region'
										underlineColorAndroid={ COLORS.black }
										inputMode='text'
										keyboardType='default'
										textAlign='center'
										onChangeText={ ( text ) => { 
												setWalletForm( { ...walletForm, address:{ ...walletForm.address, state: text} } )
										} }
										style={ paymentViewStyle.walletFormRowInput }
										value={ walletForm.address.state }

								/>
						</View>
						<View style={ paymentViewStyle.walletFormRow }>
								<Text style={ paymentViewStyle.walletFormRowLabel }>Państwo: </Text>
								<TextInput 
										underlineColorAndroid={ COLORS.black }
										autoComplete='postal-address-country'
										inputMode='text'
										keyboardType='default'
										textAlign='center'
										onChangeText={ ( text ) => { 
												setWalletForm( { ...walletForm, address:{ ...walletForm.address, country: text } } )
										} }
										style={ paymentViewStyle.walletFormRowInput }
										value={ walletForm.address.country }
								/>
						</View>
				</View>
				<View style={ paymentViewStyle.walletFormButtonRow }>
				<Pressable
						onPress={ () => handleWalletFormSave() }
						style={ paymentViewStyle.walletFormButton }
						android_ripple={{ 
								color: "#fff",
								borderless: false,
								radius: 50,
								foreground: false,
						}}
				>
						<Text style={ paymentViewStyle.walletFormButtonLabel }>Zapisz dane</Text>
				</Pressable>
				<Pressable
						onPress={ () => { setWalletForm( emptyForm ) } }
						style={ paymentViewStyle.walletFormButton }
						android_ripple={{ 
								color: "#fff",
								borderless: false,
								radius: 50,
								foreground: false,
						}}
				>
						<Text style={ paymentViewStyle.walletFormButtonLabel }>Wyzeruj wartość pól</Text>
				</Pressable>
				</View>
		</View>
		);
};

export default WalletFormView;
