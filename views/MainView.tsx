import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, Text, StyleSheet, TextStyle, RegisteredStyle, ViewStyle } from 'react-native';
import { faUtensils, faTableList, faBasketShopping, faEllipsisVertical, faStore } from "@fortawesome/free-solid-svg-icons";
import {icon} from '@fortawesome/fontawesome-svg-core';

const Tab = createBottomTabNavigator();

const OrdersScreen = () => {
		return(
				<View style={style.container}>
						<Text>Orders</Text>
				</View>
		);
};

const MenuScreen = () => {
		return(
				<View style={style.container}>
						<Text>Menu</Text>
				</View>
		);
};

const ShopScreen = () => {
		return(
				<View style={style.container}>
						<Text>Shop</Text>
				</View>
		);
};

const CartScreen = () => {
		return(
				<View style={style.container}>
						<Text>Shopping cart</Text>
				</View>
		);
};

const MoreScreen = () => {
		return(
				<View style={style.container}>
						<Text>More</Text>
				</View>
		 );
};

interface HeaderProps {
		style: RegisteredStyle<ViewStyle>, 
		titleStyle: RegisteredStyle<TextStyle>,
		title: string,
}

const HeaderView = (props: HeaderProps) => {
		return(
		<View style={props.style}>
				<Text>K</Text>
				<Text style={props.titleStyle}>{props.title}</Text>
				<Text>L</Text>
		</View>
		);
};

const MainView = () => {
		return(
				<Tab.Navigator
				screenOptions={({route}) => ({
						header: ({ navigation, route, options }: BottomTabHeaderProps) => {
								return <HeaderView title={route.name} style={options.headerStyle} titleStyle={options.headerTitleStyle}/>
						},
						headerStyle: {
								height: 60,
								flexDirection: "row",
								flexWrap: "nowrap",
								backgroundColor: "#fff",
								alignItems: "center",
								justifyContent: "space-between",
								paddingHorizontal: 30,
						},
						headerTitleStyle: {
								textAlign: "center",
								fontWeight: "bold",
								fontSize: 16,
						}, 
						tabBarIcon: ({focused, color, size}) => {
								let iconName;
								switch(route.name){
										case "Orders":{
												iconName=faTableList;
										} break;
										case "Menu":{
												iconName=faUtensils;
										} break;
										case "Shop":{
												iconName=faStore;
										} break;
										case "Cart":{
												iconName=faBasketShopping;
										} break;
										case "More":{
												iconName=faEllipsisVertical;
										} break;
								};

								return <FontAwesomeIcon icon={iconName} color={color} size={size} /> 
						},
				})}
				>
						<Tab.Screen name="Orders" component={OrdersScreen} />
						<Tab.Screen name="Menu" component={MenuScreen} />
						<Tab.Screen name="Shop" component={ShopScreen} />
						<Tab.Screen name="Cart" component={CartScreen} />
						<Tab.Screen name="More" component={MoreScreen} />
				</Tab.Navigator>
		);
};

const style = StyleSheet.create({
		container: {
				flex: 1,
				padding: "auto",
				justifyContent: "center",
				alignItems: "center",
		},
		text:{
				
		},
});

export default MainView;
