import { useCallback, useEffect, useState } from "react";
import { View, Text, SectionList, ToastAndroid, TouchableOpacity, RefreshControl } from "react-native";
import { OrderProps, RootStackParamList } from "../../types";
import { getOrders } from "../../api";
import { useRecoilValue } from "recoil";
import { userDataSelector, userTokenSelector } from "../utils/user";
import { useNavigation } from "@react-navigation/native";
import { OrderData, OrderStatus } from "../../api/orders/types";
import { cartViewStyles, newOrder, orderViewStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceMeh } from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native-gesture-handler";
import jwtDecode from "jwt-decode";

const formatDate = (timestampInSeconds: number): string => {
  const date = new Date(timestampInSeconds * 1000);
  const daysOfWeek = ["nd.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${dayOfWeek} | ${dayOfMonth}.${month}.${year} | ${hours}:${minutes}`;
};

const getStatus = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.Paid:
      return "Opłacone";
    case OrderStatus.Prepared:
      return "Przygotowywane";
    case OrderStatus.Ready:
      return "Gotowe do odbioru";
    case OrderStatus.Collected:
      return "Odebrane";
  }
};

const Order = ({ id, username, collectionDate, status, paymentMethod, data }: OrderProps) => {
  const navigation = useNavigation<RootStackParamList>();

  const showDetails = () => {
    navigation.navigate("OrderDetailsView", { id, username, collectionDate, status, paymentMethod, data });
  };

  return (
    <View style={newOrder.container}>
      <View style={newOrder.orderContainer}>
        <TouchableOpacity onPress={() => showDetails()} activeOpacity={0.5}>
          <View style={newOrder.infoContainer}>
            <View style={newOrder.pairRow}>
              <View style={newOrder.pairItem}>
                <Text style={newOrder.label}>Nr zamówienia</Text>
                <Text style={{ ...newOrder.content, fontSize: 18 }}>{id}</Text>
              </View>
              <View style={newOrder.pairItem}>
                <Text style={newOrder.label}>Odbiorca</Text>
                <Text style={newOrder.content}>{username}</Text>
              </View>
            </View>
            <View style={newOrder.pairRow}>
              <View style={newOrder.pairItem}>
                <Text style={newOrder.label}>Status</Text>
                <Text style={{ ...newOrder.content, fontWeight: "bold" }}>{status}</Text>
              </View>
              <View style={newOrder.pairItem}>
                <Text style={newOrder.label}>Data odbioru</Text>
                <Text style={newOrder.content}>{collectionDate}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OrderPanelBlank = ({ refreshControl }: any) => {
  return (
    <ScrollView contentContainerStyle={cartViewStyles.cartPanelBlank} refreshControl={refreshControl}>
      <FontAwesomeIcon icon={faFaceMeh} color={cartViewStyles.cartPanelBlankIcon.color} size={cartViewStyles.cartPanelBlankIcon.width} />
      <Text style={cartViewStyles.cartPanelBlankHeader}>Nie masz jeszcze żadnych zamówień!</Text>
      <Text style={cartViewStyles.cartPanelBlankText}>Śmiało! Dodaj swoje ulubione produkty i za nie zapłać</Text>
    </ScrollView>
  );
};

const OrdersView = () => {
  const navigation = useNavigation<RootStackParamList>();
  const [ordersData, setOrdersData] = useState<OrderData[] | null>(null);
  const accessToken = useRecoilValue(userTokenSelector);

  useEffect(() => {
    getData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);
  const refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;

  async function getData() {
    const data = await getOrders(accessToken!, (res) => {
      if (res === "logout") return navigation.navigate("LoginScreen");

      let error = "";
      switch (res.status) {
        case 400:
          error = "Pobranie zamówień nie powiodło się";
          break;
        case 500:
          error = "Wystąpił błąd serwera";
          break;
        default:
          error = `Wystąpił nieokreślony błąd (${res.status})`;
          break;
      }

      ToastAndroid.show(error, ToastAndroid.SHORT);
    });

    if (!data || data.length === 0) return;
    setOrdersData(data);
  }

  if (!accessToken || !ordersData || ordersData.length === 0) {
    return <OrderPanelBlank refreshControl={refreshControl} />;
  }

  const userData = jwtDecode(accessToken);

  const DATA = [];
  const activeOrders = ordersData?.filter((order) => order.status !== OrderStatus.Collected);
  if (activeOrders.length !== 0) DATA.push({ title: "Aktywne", data: activeOrders });

  const finishedOrders = ordersData?.filter((order) => order.status === OrderStatus.Collected);
  if (finishedOrders.length !== 0) DATA.push({ title: "Zrealizowane", data: finishedOrders });

  console.log("DATA", DATA);

  return (
    <ScrollView style={orderViewStyles.container} refreshControl={refreshControl}>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(data) => {
          const formattedId = data.item.id.toString().padStart(4, "0");
          const formattedDate = formatDate(data.item.collectionDate);
          const formattedStatus = getStatus(data.item.status);

          return (
            <Order
              id={formattedId}
              collectionDate={formattedDate}
              username={userData?.username ?? "brak"}
              status={formattedStatus}
              paymentMethod={"Stripe"} // TODO: someday
              data={data.item.data}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => <Text style={orderViewStyles.title}>{title}</Text>}
      />
    </ScrollView>
  );
};

export default OrdersView;
