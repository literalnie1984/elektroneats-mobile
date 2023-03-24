import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import MainView from "./src/views/MainView";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <MainView />
        <StatusBar style="auto" translucent={false} hidden={false} animated={true} backgroundColor={"transparent"} />
      </NavigationContainer>
    </RecoilRoot>
  );
}
