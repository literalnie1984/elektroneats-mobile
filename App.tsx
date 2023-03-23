import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainView from './views/MainView';

export default function App() {
  return (
    <NavigationContainer>
		<MainView />
		<StatusBar style="auto" translucent={false} hidden={false} animated={true} backgroundColor={'transparent'} />
	</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
