import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import { StripeProvider } from "@stripe/stripe-react-native";
import MainView from "./src/views/MainView";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51MpCAID80hN9rXmTDAfEgiTv1MQlBADcKXS2Q0UQsbEms15Xwg9F0vBg5HSPol3VThIJrzr6RGtJfhyPbgUt7irN00VakiDrLD">
      <RecoilRoot>
        <NavigationContainer>
          <MainView />
          <StatusBar style="auto" translucent={false} hidden={false} animated={true} backgroundColor={"transparent"} />
        </NavigationContainer>
      </RecoilRoot>
    </StripeProvider>
  );
}
