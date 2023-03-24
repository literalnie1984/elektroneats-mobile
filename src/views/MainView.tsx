import { createStackNavigator } from '@react-navigation/stack';
import TabsView from './TabsView';
import AccountView from './AccountView';

const Stack = createStackNavigator();
const MainView = () => {
		return(
				<Stack.Navigator
						initialRouteName='TabsView'
						screenOptions={{
								animationTypeForReplace: "pop",

						}}
				>
						<Stack.Screen name="TabsView" component={TabsView} options={{headerShown: false}}/>
						<Stack.Screen name="AccountView" component={AccountView} />
				</Stack.Navigator>
		);
};

export default MainView;