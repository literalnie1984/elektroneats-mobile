import { Text, View } from 'react-native';
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {parseDateToString} from "../views/tabs/CartView";
import {balanceAtom, walletAtom} from "../views/utils/wallet";
import Spinner from "react-native-loading-spinner-overlay/lib";
import {getBalance, getClientData} from '../api';
import {userTokensAtom} from '../views/utils/user';
import {Button} from 'react-native';
import WalletFormView from './WalletFormView';
import WalletTopUpView from './WalletTopUpView';
import {ToastAndroid} from 'react-native';

// Saldo i kwoty w GROSZACH!!!

const PaymentView = ({ navigation, route }) => {
		const [ tokens ] = useRecoilState(userTokensAtom);
		const [ isLoading, setIsLoading ] = useState(true);
		const [ wallet, setWallet ] = useRecoilState(walletAtom);
		const [ balance, setBalance ] = useRecoilState(balanceAtom);
		const [ currentView, setCurrentView ] = useState('none');

		const { orderValue, pickupDate } = route.params;

				useEffect(() => {
						getClientData(tokens, ( res ) => {
								!res.err ? console.log("Success") : console.log("Bruh");
						})
						.then( (value) => { console.log(value); setWallet( value );} )
						.then( () => getBalance( tokens, ( res ) => {
								!res.err ? console.log("Success") : console.log("Bruh");
						} ) )
						.then( (value) => value ? setBalance( value / 100 ) : setBalance( value ) )
						.then( () => determinePanel() )
						.then( () => setIsLoading(false) )
				}, [])

				const Undisplay = async () => {
						getBalance( tokens, (res) => {
								!res.err ? console.log("Success") : console.log("Bruh")
						} )
						.then( (value) => {
								if( value !== null ){
										setBalance( value / 100 );
								} else {
										ToastAndroid.show("Error during balance fetching occured", ToastAndroid.SHORT);
										setBalance( value );
								}
						} )
						.then( () => determinePanel() )
						.then( () => setIsLoading(false) );
				}

				const determinePanel = () => {
						if(wallet){
								if(balance >= orderValue) {
										setCurrentView('checkout');
								} else {
										setCurrentView('topUp_info');
								}
						} else {
								setCurrentView('walletForm_info');
						}
				}

		return(
				<View>
						<Spinner visible={isLoading} />
						<Text>{`Kwota operacji: ${orderValue.toFixed(2)}zł`}</Text>
						<Text>{`Data odbioru: ${parseDateToString(pickupDate)}`}</Text>
						<View>
								<View style={[ { display: currentView === 'walletForm_info' ? 'flex' : 'none', }, ]}>
										<Text>Wygląda na to, że nie masz stworzonego portfela</Text>
										<Text>Stwórz go w celu kontynuowania transakcji</Text>
										<Button
												onPress={ () => { setCurrentView('walletForm') } }
												title={ "Stwórz portfel" }
										/>
								</View>
								<WalletFormView
										isDisplayed={ currentView === 'walletForm' }
										setIsLoading={ setIsLoading }
										unDisplay={ Undisplay }
								/>
								<View style={[ { display: currentView === 'topUp_info' ? 'flex' : 'none', }, ]}>
										<Text>{`Twoje saldo: ${ balance?.toFixed(2) }zł`}</Text>
										<Text>{`Musisz zasilić konto kwotą co najmniej ${ ( orderValue - Number(balance) ).toFixed(2) }zł`}</Text>
										<Button
												onPress={ () => { setCurrentView('topUp') } }
												title={ "Doładuj portfel" }
										/>
								</View>
								<WalletTopUpView
										isDisplayed={ currentView === 'topUp' }
										setIsLoading={ setIsLoading }
										isLoading={ isLoading }
										unDisplay={ Undisplay }
										balanceDiff={ Number((orderValue - Number(balance)).toFixed(2)) }
								/>
						</View>
				</View>
		);
};

export default PaymentView;
