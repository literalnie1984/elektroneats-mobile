import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { menuAtom } from "./utils/menu";
import { createStackNavigator } from "@react-navigation/stack";
import TabsView from "./TabsView";
import AccountView from "./stack/AccountView";
import DinnerView from "./stack/DinnerView";
import * as OptionsViews from "./stack/optionsViews/";
import { getLastMenuUpdate, getWeeklyMenu } from "../api";
import { RootStackParamList } from "../types";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import EmailConfirmationScreen from "./screens/EmailConfirmationScreen";
import { userTokensAtom } from "./utils/user";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import OrderDetailsView from "./stack/OrderDetailsView";
import PaymentView from "../components/PaymentView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

let device_theme: string; 

export const Stack = createStackNavigator<RootStackParamList>();
const MainView = () => {
  const [menu, setMenu] = useRecoilState(menuAtom);
  const [tokens, setTokens] = useRecoilState(userTokensAtom);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [appIsReady]);

  useEffect(() => {
    (async function(){
      const tokens = await SecureStore.getItemAsync("tokens");
      console.log(`Getting tokens from SecureStore\nValue: ${tokens}\nType: ${typeof tokens}`);
      if (tokens && tokens !== 'null') {
        console.log("tokens exist -> forcing TabsView");
        setInitialRoute("TabsView");
        setTokens(JSON.parse(tokens));
      } else {
        console.log("tokens doesnt exist -> forcing LoginScreen");
        setInitialRoute("LoginScreen");
      }

      // MENU
      async function updateWeeklyMenu() {
        const weeklyMenu = await getWeeklyMenu();
        if(weeklyMenu) AsyncStorage.setItem('weeklyMenu', JSON.stringify(weeklyMenu));
        setMenu(weeklyMenu);
      }

      const lastMenuUpdate = await getLastMenuUpdate();
      if(lastMenuUpdate) {
        const { lastUpdate } = lastMenuUpdate;

        const savedLastMenuUpdate = await AsyncStorage.getItem('lastMenuUpdate');
        const currTimeInSec = Math.round((new Date().getTime()) / 1000);

        if(!savedLastMenuUpdate) {
          AsyncStorage.setItem('lastMenuUpdate', currTimeInSec.toString());
          updateWeeklyMenu();
        } else {
          const savedLastMenuUpdateNum = Number(savedLastMenuUpdate);
          if(!isNaN(savedLastMenuUpdateNum) && lastUpdate > currTimeInSec) {
            AsyncStorage.setItem('lastMenuUpdate', currTimeInSec.toString());
            updateWeeklyMenu();
          } else {
            const savedWeeklyMenu = await AsyncStorage.getItem('weeklyMenu');
            if(!savedWeeklyMenu) updateWeeklyMenu();
            else setMenu(JSON.parse(savedWeeklyMenu));
          }
        }
      }

      setAppIsReady(true);
    })();
  }, []);

  useEffect(() => {
    SecureStore.getItemAsync("tokens").then((data) => {
      if (data) {
        console.log("token has been found in securestore and saved successfully");
        setInitialRoute("TabsView");
      } else {
        console.log("no token in securestore");
        setInitialRoute("LoginScreen");
      }
      setTokens(JSON.parse((data ?? "{}")));
      setAppIsReady(true);
    });
  }, []);

  if (!appIsReady || initialRoute === null) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EmailConfirmationScreen" component={EmailConfirmationScreen} options={{ headerShown: false }} />

      <Stack.Screen name="TabsView" component={TabsView} options={{ headerShown: false }} />
      <Stack.Screen name="Account" component={AccountView} />
      <Stack.Screen name="DinnerView" component={DinnerView} />
      <Stack.Screen name="OrderDetailsView" component={OrderDetailsView} options={{ title: "Szczegóły zamówienia" }} />
      <Stack.Group>
        <Stack.Screen name="Look and Feel" component={OptionsViews.LookAndFeelView} />
        <Stack.Screen name="Payment Settings" component={OptionsViews.PaymentSettingsView} />
        <Stack.Screen name="Miscellaneous" component={OptionsViews.MiscellaneousOptionsView} />
        <Stack.Screen name="Biometrics and Security" component={OptionsViews.SecurityOptionsView} />
        <Stack.Screen name="Informations" component={OptionsViews.InformationsView} />
      </Stack.Group>
      <Stack.Screen name="PaymentView" component={PaymentView} />
    </Stack.Navigator>
  );
};

export default MainView;
export { device_theme };
