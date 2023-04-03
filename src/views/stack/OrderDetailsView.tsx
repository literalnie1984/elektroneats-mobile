import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { DinnerViewDisplayMode, OrderDetailsViewProps, RootStackParamList } from "../../types";
import { COLORS } from "../colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { newOrder } from "../../styles";
import { OrderDinner } from "../../api/orders/types";
import { calculteOrderDinnerCost } from "../utils/cart";

const orderDetails = StyleSheet.create({
  container: {
    // paddingTop: 16
  },
  infoContainer: {
    ...newOrder.orderContainer,
    ...newOrder.infoContainer,
    backgroundColor: "#fff",
  },
  pairRow: {
    ...newOrder.pairRow,
    marginHorizontal: 18,
  },
  pairItem: {
    ...newOrder.pairItem,
    marginVertical: 8,
  },
  label: {
    ...newOrder.label,
  },
  content: {
    ...newOrder.content,
  },
  categoryText: {
    width: "100%",
    fontSize: 19,
    // color: '#808080',
    paddingVertical: 12,
    marginLeft: 18,
    color: "#5491ff",
    // fontWeight: 'bold',
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const orderContent = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    marginBottom: 24,
    shadowColor: COLORS.chestnut,
    elevation: 6,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    textAlign: "right",
    paddingTop: 10,
    fontSize: 13,
    color: "#525e70",
    paddingBottom: 2,
    marginHorizontal: 10,
  },
  orderName: {
    fontSize: 17,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  orderPrice: {
    fontSize: 15,
  },
});

export type EmailConfirmationScreenProps = NativeStackScreenProps<RootStackParamList, "EmailConfirmationScreen">;

interface OrderItemProps {
  amount: number;
  price: number;
  orderDinner: OrderDinner;
  navigation: OrderDetailsViewProps["navigation"];
}

export const DinnerOrderItem = ({ amount, price, orderDinner, navigation }: OrderItemProps) => {
  const showOrderContent = () => {
    navigation.navigate('DinnerView', { mode: DinnerViewDisplayMode.INFO, data: orderDinner });
  };

  return (
    <View style={orderContent.container}>
      <TouchableOpacity onPress={() => showOrderContent()} activeOpacity={0.5}>
        <View style={orderContent.firstRow}>
          {/* <Image style={{ width: 48, height: 48 }} source={{ uri: placeholderUri }} /> */}
          <Text style={orderContent.orderName}>Obiad</Text>
          <Text style={orderContent.orderPrice}>{amount} x {(price * amount).toFixed(2)} zł</Text>
          <Text style={orderContent.orderPrice}>{price.toFixed(2)} zł</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const OrderDetailsView = ({ route, navigation }: OrderDetailsViewProps) => {
  const { id, paymentMethod, username, collectionDate, status, data } = route.params;

  let totalPrice = 0;
  const dinnerOrderItems: JSX.Element[] = [];

  data.forEach((orderDinner) => {
    const orderDinnerPrice = calculteOrderDinnerCost(orderDinner);
    totalPrice += orderDinnerPrice;
    dinnerOrderItems.push(<DinnerOrderItem 
        amount={1}
        price={orderDinnerPrice}
        orderDinner={orderDinner} 
        navigation={navigation} 
    />)
  });

  return (
    <View style={orderDetails.container}>
      <Text style={orderDetails.categoryText}>Informacje:</Text>
      <View style={orderDetails.center}>
        <View style={orderDetails.infoContainer}>
          <View style={orderDetails.pairRow}>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Nr zamówienia</Text>
              <Text style={{ ...orderDetails.content, fontSize: 20 }}>{id}</Text>
            </View>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Odbiorca</Text>
              <Text style={orderDetails.content}>{username}</Text>
            </View>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Koszt transakcji</Text>
              <Text style={orderDetails.content}>{totalPrice.toFixed(2)} zł</Text>
            </View>
          </View>
          <View style={orderDetails.pairRow}>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Status</Text>
              <Text style={{ ...orderDetails.content, fontWeight: "bold" }}>{status}</Text>
            </View>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Data odbioru</Text>
              <Text style={orderDetails.content}>{collectionDate}</Text>
            </View>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Metoda płatności</Text>
              <Text style={orderDetails.content}>{paymentMethod}</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={orderDetails.categoryText}>Zawartość zamówienia:</Text>
      <View style={orderDetails.center}>
          {dinnerOrderItems}
      </View>
    </View>
  );
};

export default OrderDetailsView;
