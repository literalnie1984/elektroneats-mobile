import { BottomTabHeaderProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUtensils, faTableList, faBasketShopping, faStore, faGear } from "@fortawesome/free-solid-svg-icons";
import HeaderView from "./HeaderView";
import OrdersScreen from "./tabs/OrdersView";
import MenuScreen from "./tabs/MenuView";
import CartScreen from "./tabs/CartView";
import MoreScreen from "./tabs/MoreView";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
import { useTheme } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const TabsView = ({ navigation }: any) => {
  const theme = useTheme();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation, route, options }: BottomTabHeaderProps) => {
          return <HeaderView title={route.name} style={options.headerStyle as any} titleStyle={options.headerTitleStyle as any} stackNavigation={navigation} />;
        },
        headerStyle: {
          height: "auto",
          flexDirection: "row",
          flexWrap: "nowrap",
          backgroundColor: theme.colors.card,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 50,
          paddingVertical: 10
        },
        headerTitleStyle: {
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          color: theme.colors.text,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconProp;
          switch (route.name) {
            case "Jadłospis":
              iconName = faUtensils;
              break;
            case "Zamów":
              iconName = faStore;
              break;
            case "Koszyk":
              iconName = faBasketShopping;
              break;
            case "Zamówienia":
              iconName = faTableList;
              break;
            case "Ustawienia":
              iconName = faGear;
              break;
          }

          return <FontAwesomeIcon icon={iconName!} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Jadłospis" component={MenuScreen} />
      <Tab.Screen name="Koszyk" component={CartScreen} />
      <Tab.Screen name="Zamówienia" component={OrdersScreen} />
      <Tab.Screen name="Ustawienia" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default TabsView;
