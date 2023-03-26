import { createStackNavigator } from "@react-navigation/stack";
import TabsView from "./TabsView";
import AccountView from "./stack/AccountView";
import DinnerView from "./stack/DinnerView";

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
      <Stack.Screen name="AccountView" component={AccountView} />
      <Stack.Screen name="DinnerView" component={DinnerView} />
    </Stack.Navigator>
  );
};

export default MainView;
