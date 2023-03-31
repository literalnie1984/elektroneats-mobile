import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { menuAtom } from "./utils/menu";
import { createStackNavigator } from "@react-navigation/stack";
import TabsView from "./TabsView";
import AccountView from "./stack/AccountView";
import DinnerView from "./stack/DinnerView";
import * as OptionsViews from "./stack/optionsViews/";
import { getWeeklyMenu } from "../api";
import { RootStackParamList } from "../types";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import EmailConfirmationScreen from "./screens/EmailConfirmationScreen";
import { userTokenAtom } from "./utils/user";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import { View } from "react-native";
import * as SecureStore from "expo-secure-store";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();
const MainView = () => {
  const [menu, setMenu] = useRecoilState(menuAtom);
  const [token, setToken] = useRecoilState(userTokenAtom);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [appIsReady]);

  useEffect(() => {
    getWeeklyMenu().then((menu) => setMenu(menu));
    SecureStore.getItemAsync("token").then((data) => {
      if (data) {
        console.log("token has been found in securestore and saved successfully");
        setInitialRoute("TabsView");
      } else {
        console.log("no token in securestore");
        setInitialRoute("LoginScreen");
      }
      setToken(data);
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
      <Stack.Group>
        <Stack.Screen name="Look and Feel" component={OptionsViews.LookAndFeelView} />
        <Stack.Screen name="Payment Settings" component={OptionsViews.PaymentSettingsView} />
        <Stack.Screen name="Miscellaneous" component={OptionsViews.MiscellaneousOptionsView} />
        <Stack.Screen name="Biometrics and Security" component={OptionsViews.SecurityOptionsView} />
        <Stack.Screen name="Informations" component={OptionsViews.InformationsView} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainView;
