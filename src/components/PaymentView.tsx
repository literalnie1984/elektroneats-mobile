import { View, Text, Pressable, Modal, TextInput, ToastAndroid, Button } from 'react-native';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useStripe } from '@stripe/stripe-react-native';
import { userTokenAtom } from "../views/utils/user";
import { setWallet, getClientData, getPaymentSheetParams } from "../api";
import { walletAtom, balanceAtom, verifyPhoneNumberIntegrity, verifyPostalIntegrity, verifyEmailAddressIntegrity, verifyNameIntegrity, parseFormToDetails } from "../views/utils/wallet";
import Spinner from "react-native-loading-spinner-overlay/lib";

const emptyForm = {
		name: '', phone_number: '', email: '', 
		city: '', country: '', postal_code: '', 
		region: '', address_line: '',
};

const PaymentView = ({ cartValue, }) => {
		const [ token ] = useRecoilState(userTokenAtom);
		const [ wallet, setWalletAtom ] = useRecoilState(walletAtom);
		const [ balance, setBalance ] = useRecoilState(balanceAtom);
		const [ isLoading, setIsLoading ] = useState(true);
		const [ showWalletInitModal, setShowWalletInitModal ] = useState(false);
		const [ showWalletChargeUpModal, setShowWalletChargeUpModal ] = useState(false);
		const [ walletForm, setWalletForm ] = useState( emptyForm );
		const [ topUpBalance, setTopUpBalance ] = useState( 0 );
		const [ chosenPaymentMethod, setChosenPaymentMethod ] = useState('none');
		const { initPaymentSheet, presentPaymentSheet } = useStripe();
		
		useEffect( () => { 
						getClientData( token ).then( ( value ) => setWalletAtom( value ) ).then( () => setIsLoading(false));
						initializePaymentSheet();
		}, [] );

		const handleWalletFormSave = () => {
				if(
								verifyPhoneNumberIntegrity( walletForm.phone_number.trim() ) &&
								verifyPostalIntegrity( walletForm.postal_code.trim() ) &&
								verifyEmailAddressIntegrity( walletForm.email.trim() ) &&
								verifyNameIntegrity( walletForm.name.trim() )
				  ){
						setIsLoading(true);
						setWallet( token, parseFormToDetails( walletForm )).then( ( res ) => {
								if( res === false ){
										ToastAndroid.show("Wystąpił błąd podczas zapisu portfela", ToastAndroid.LONG);
										setIsLoading(false);
								}
								else {
										getClientData( token ).then( ( value ) => setWalletAtom( value ) )
										.then( () => { 
												setIsLoading(false);
												ToastAndroid.show("Dodano nowy portfel!", ToastAndroid.LONG);
												setShowWalletInitModal(!showWalletInitModal);
										} );
								}
						} )
						setWalletForm( emptyForm );
				}
				else {
						if( !verifyPhoneNumberIntegrity( walletForm.phone_number ) ){
								ToastAndroid.show( "Wprowadź prawidłowy numer telefonu!", ToastAndroid.LONG );
						} else if ( !verifyNameIntegrity( walletForm.name ) ){
								ToastAndroid.show( "Wprowadź poprawne dane osobowe!", ToastAndroid.LONG );
						} else if ( !verifyPostalIntegrity( walletForm.postal_code ) ){
								ToastAndroid.show( "Wprowadź prawidłowy kod pocztowy", ToastAndroid.LONG);
						} else if ( !verifyEmailAddressIntegrity( walletForm.email ) ){
								ToastAndroid.show( "Wprowadź prawidłowy adres email!", ToastAndroid.LONG );
						}

						setWalletForm( emptyForm );
				}
		}

		const initializePaymentSheet = async () => {
				const {
						paymentIntent,
						ephemeralKey,
						customer,
						publishableKey,
				} = await getPaymentSheetParams( token );

				const { error } = await initPaymentSheet({
						merchantDisplayName: "Kantyna Elektronik",
						customerId: customer,
						customerEphemeralKeySecret: ephemeralKey,
						paymentIntentClientSecret: paymentIntent,
						allowsDelayedPaymentMethods: false,
						defaultBillingDetails: {
								email: "jankowalski@email.pl",
								name: "Jan Kowalski",
								phone: "987654321",
								address: {
										line1: "ul. Chrzanowa 32",
										postalCode: "43-398",
										city: "Sosnowiec",
										state: "Śląskie",
										country: "Polska"
								},
						},
				});

				if(!error){
						setIsLoading(true);
				}
		};

		const openPaymentSheet = async () => {
				const { error } = await presentPaymentSheet();

				if(error){
						ToastAndroid.show(`Błąd ${error.code}: ${error.message}`, ToastAndroid.LONG);
				} else {
						ToastAndroid.show(`Sukces! Potwierdzono zamówienie!`, ToastAndroid.LONG);
				}
		};

		return(
				<View>
						<Spinner visible={isLoading} />
						{ true ? (
								balance ? (
										balance < cartValue ? (
												<>
												<Text>Brakuje ci: { cartValue - balance }</Text>
												<Text>Uzupełnij portfel, zanim przejdziesz dalej</Text>
												<Pressable><Text>Przejdź do menu portfela</Text></Pressable>
												</>
										) : (
												<></>
										)
								) : (
										<>
										<Text>Nie masz żadnych środków w portfelu</Text>
										<Text>Uzupełnij portfel, zanim przejdziesz dalej</Text>
										<Pressable onPress={() => setShowWalletChargeUpModal(!showWalletChargeUpModal)}><Text>Przejdź do menu doładowania środków</Text></Pressable>
										<Modal
												visible={showWalletChargeUpModal}
										>
												<View>
														<View>
																<Text> Jaką kwotą chciałbyś zasilić portfel? </Text>
																<TextInput
																		inputMode='numeric'
																		keyboardType='numeric'
																		textAlign='center'
																		onChangeText={ ( text ) => { 
																				setTopUpBalance(Number(text));
																		}}
																		value={ topUpBalance  }
																/>
																<Text>zł</Text>
														</View>
														<View>
																<Text> Wybierz preferowaną metodę płatności: </Text>
																<View>
																		<Pressable onPress={ () => setChosenPaymentMethod('card') }>
																				<Text>Karta</Text>
																		</Pressable>
																		<Modal visible={ chosenPaymentMethod == 'card' }>
																				<Button
																						
																						onPress={() => ToastAndroid.show("Przechodzimy do płatności", ToastAndroid.SHORT)}
																						title={"Przejdź do płatności"}
																				/>
																		</Modal>
																</View>
														</View>
														
												</View>
										</Modal>
										</>
								)
						) : (
								<>
								<Text>Wygląda na to że masz niezałożony portfel</Text>
								<Text>Załóż go zanim będziesz mógł kontynuować zakup</Text>
								<Pressable onPress={ () => setShowWalletInitModal(!showWalletInitModal) }>
										<Text>Utwórz portfel</Text>
								</Pressable>
								<Modal
										visible={showWalletInitModal}
								>
										<View>
												<Text>Imię i nazwisko: </Text>
												<TextInput 
														autoComplete='name'
														inputMode='text'
														keyboardType='default'
														textAlign='center'
														onChangeText={ ( text ) => { 
																setWalletForm( { ...walletForm, name: text } )
														} }
														value={ walletForm.name }

												/>
										</View>
										<View>
												<Text>Numer telefonu: </Text>
												<TextInput 
														autoComplete='tel'
														inputMode='numeric'
														keyboardType='phone-pad'
														textAlign='center'
														onChangeText={ ( text ) => { 
																setWalletForm( { ...walletForm, phone_number: text } )
														} }
														value={ walletForm.phone_number }
												/>
										</View>
										<View>
												<Text>Adres email: </Text>
												<TextInput 
														autoComplete='email'
														inputMode='email'
														keyboardType='email-address'
														textAlign='center'
														onChangeText={ ( text ) => { 
																setWalletForm( { ...walletForm, email: text } )
														} }
														value={ walletForm.email }
												/>
										</View>
										<View>
												<Text>Dane adresowe: </Text>
												
												<View>
														<Text>Ulica, numer domu i numer apartamentu: </Text>
														<TextInput 
																autoComplete='postal-address'
																inputMode='text'
																keyboardType='default'
																textAlign='center'
																onChangeText={ ( text ) => { 
																		setWalletForm( { ...walletForm, address_line: text } )
																} }
																value={ walletForm.address_line }
														/>
												</View>	
												<View>
														<Text>Kod pocztowy: </Text>
														<TextInput 
																autoComplete='postal-code'
																inputMode='text'
																keyboardType='numbers-and-punctuation'
																textAlign='center'
																onChangeText={ ( text ) => { 
																		setWalletForm( { ...walletForm, postal_code: text } )
																} }
																value={ walletForm.postal_code }
														/>
												</View>
												<View>
														<Text>Miasto: </Text>
														<TextInput 
																autoComplete='postal-address-locality'
																inputMode='text'
																keyboardType='default'
																textAlign='center'
																onChangeText={ ( text ) => { 
																		setWalletForm( { ...walletForm, city: text } )
																} }
																value={ walletForm.city }
														/>
												</View>
												<View>
														<Text>Województwo/Stan/Hrabstwo: </Text>
														<TextInput 
																autoComplete='postal-address-region'
																inputMode='text'
																keyboardType='default'
																textAlign='center'
																onChangeText={ ( text ) => { 
																		setWalletForm( { ...walletForm, region: text } )
																} }
																value={ walletForm.region }

														/>
												</View>
												<View>
														<Text>Państwo: </Text>
														<TextInput 
																autoComplete='postal-address-country'
																inputMode='text'
																keyboardType='default'
																textAlign='center'
																onChangeText={ ( text ) => { 
																		setWalletForm( { ...walletForm, country: text } )
																} }
																value={ walletForm.country }
														/>
												</View>
										</View>
										<Pressable
												onPress={ () => handleWalletFormSave() }
										>
												<Text>Zapisz dane</Text>
										</Pressable>
										<Pressable
												onPress={ () => { setWalletForm( emptyForm ) } }
										>
												<Text>Wyzeruj wartość pól</Text>
										</Pressable>
								</Modal>
								</>
						) }
				</View>
		);
};

export default PaymentView;
