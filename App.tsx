import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import { StripeProvider } from "@stripe/stripe-react-native";
import MainView from "./src/views/MainView";
import RecoilNexus from "recoil-nexus";
import { Options } from "./src/views/utils/options";
import { COLORS } from "./src/views/colors";
import { isDark } from "./global";

export default function App() {
  const lightTheme = {
    dark: false,
    colors: {
      primary: COLORS.colar,
      background: COLORS.whiteColar,
      card: COLORS.darkChestnut,
      altCard: COLORS.whiterColar,
      text: COLORS.gunmetal,
      altText: COLORS.whiterColar,
      border: COLORS.saffron,
      notification: COLORS.whiterColar,
    },
  };

  const darkTheme = {
    dark: true,
    colors: {
      primary: COLORS.colar,
      background: COLORS.darkGrey,
      card: COLORS.darkChestnut,
      altCard: COLORS.gunmetal,
      text: COLORS.whiteColar,
      altText: COLORS.grey,
      border: COLORS.saffron,
      notification: COLORS.gunmetal,
    },
  };

  return (
    <RecoilRoot>
      <RecoilNexus />
      <StripeProvider publishableKey="pk_test_51MpCAID80hN9rXmTDAfEgiTv1MQlBADcKXS2Q0UQsbEms15Xwg9F0vBg5HSPol3VThIJrzr6RGtJfhyPbgUt7irN00VakiDrLD">
        <Options />
        <NavigationContainer>
          <MainView />
          <StatusBar style="auto" translucent={false} hidden={false} animated={true} backgroundColor={"transparent"} />
        </NavigationContainer>
      </StripeProvider>
    </RecoilRoot>
  );
}
