import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUtensils, faTableList, faBasketShopping, faEllipsisVertical, faStore } from "@fortawesome/free-solid-svg-icons";
import HeaderView from './HeaderView';
import OrdersScreen from './screens/OrdersScreen';
import MenuScreen from './screens/MenuScreen';
import ShopScreen from './screens/ShopScreen';
import CartScreen from './screens/CartScreen';
import MoreScreen from './screens/MoreScreen';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Tab = createBottomTabNavigator();
const TabsView = (props: { navigation: any; }) => {
    return(
            <Tab.Navigator
            screenOptions={({route}) => ({
header: ({ navigation, route, options }: BottomTabHeaderProps) => {
return <HeaderView title={route.name} style={options.headerStyle as any} titleStyle={options.headerTitleStyle as any} stackNavigation={props.navigation}/>
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
                            let iconName: IconProp;
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

                            return <FontAwesomeIcon icon={iconName!} color={color} size={size} /> 
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

export default TabsView;