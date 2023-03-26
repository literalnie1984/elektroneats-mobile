import { createStackNavigator } from "@react-navigation/stack";
import TabsView from "./TabsView";
import AccountView from "./stack/AccountView";
import DinnerView from "./stack/DinnerView";
import * as OptionsViews from './stack/optionsViews/';

const Stack = createStackNavigator();
const MainView = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabsView"
      screenOptions={{
        animationTypeForReplace: "pop",
      }}
    >
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
