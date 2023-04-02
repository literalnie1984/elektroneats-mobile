import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { newOrder } from "../tabs/OrdersView";
import { OrderDetailsViewProps } from "../../types";
import { COLORS } from "../colors";

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

interface OrderItemProps {
  navigation?: OrderDetailsViewProps["navigation"];
}

export const OrderItem = ({ navigation }: OrderItemProps) => {
  const showOrderContent = () => {
    // navigation.navigate('DinnerView');
  };

  return (
    <View style={orderContent.container}>
      <TouchableOpacity onPress={() => showOrderContent()} activeOpacity={0.5}>
        <View style={orderContent.firstRow}>
          <Image style={{ width: 48, height: 48 }} source={{ uri: placeholderUri }} />
          <Text style={orderContent.orderName}>Obiad</Text>
          <Text style={orderContent.orderPrice}>1 x 15,00 zł</Text>
          <Text style={orderContent.orderPrice}>15,00 zł</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const placeholderUri = "https://images.immediate.co.uk/production/volatile/sites/30/2022/03/Speedy-stroganoff-pasta-dbb29a0.jpg?quality=90&resize=556,505";

const OrderDetailsView = ({ route, navigation }: OrderDetailsViewProps) => {
  return (
    <View style={orderDetails.container}>
      <Text style={orderDetails.categoryText}>Informacje:</Text>
      <View style={orderDetails.center}>
        <View style={orderDetails.infoContainer}>
          <View style={orderDetails.pairRow}>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Nr zamówienia</Text>
              <Text style={{ ...orderDetails.content, fontSize: 20 }}>0001</Text>
            </View>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Odborca</Text>
              <Text style={orderDetails.content}>Jan Kowalski</Text>
            </View>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Kwota transakcji</Text>
              <Text style={orderDetails.content}>16,50 zł</Text>
            </View>
          </View>
          <View style={orderDetails.pairRow}>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Status</Text>
              <Text style={{ ...orderDetails.content, fontWeight: "bold" }}>Zarejestrowane</Text>
            </View>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Data odbioru</Text>
              <Text style={orderDetails.content}>03.04.23{"\n"}11:15 (pon.)</Text>
            </View>
            <View style={orderDetails.pairItem}>
              <Text style={orderDetails.label}>Metoda płatności</Text>
              <Text style={orderDetails.content}>BLIK</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={orderDetails.categoryText}>Zawartość zamówienia:</Text>
      <View style={orderDetails.center}>
        <OrderItem navigation={navigation} />
      </View>
    </View>
  );
};

export default OrderDetailsView;
