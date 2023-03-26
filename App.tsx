import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import { StripeProvider } from "@stripe/stripe-react-native";
import MainView from "./src/views/MainView";

export default function App() {
  return (
    <StripeProvider
		publishableKey="jeszcze nic tu nie ma"
	>
    <RecoilRoot>
      <NavigationContainer>
        <MainView />
        <StatusBar style="auto" translucent={false} hidden={false} animated={true} backgroundColor={"transparent"} />
      </NavigationContainer>
    </RecoilRoot>
	</StripeProvider>
  );
}
