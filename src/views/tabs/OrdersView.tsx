import { useEffect, useState } from "react";
import { View, Text, SectionList, ToastAndroid, TouchableOpacity, RefreshControl } from "react-native";
import { OrderProps, RootStackParamList, UserDecodedData } from "../../types";
import { getPendingUserOrders } from "../../api";
import { useRecoilValue } from "recoil";
import { userTokenSelector } from "../utils/user";
import { useNavigation } from "@react-navigation/native";
import { OrderData, OrderStatus } from "../../api/orders/types";
import { newOrder, orderViewStyles } from "../../styles";
import jwt_decode from "jwt-decode";

const formatDate = (timestampInSeconds: number): string => {
  const date = new Date(timestampInSeconds * 1000);
  const daysOfWeek = ["nd.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); 
  const year = date.getUTCFullYear().toString().slice(-2);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${dayOfWeek} | ${dayOfMonth}.${month}.${year} | ${hours}:${minutes}`;
}

const getStatus = (status: OrderStatus): string => {
  switch(status) {
      case OrderStatus.Paid: return "Opłacony";
      case OrderStatus.Prepared: return "Przygotowywany";
      case OrderStatus.Ready: return "Gotowy do odbioru";
      case OrderStatus.Collected: return "Odebrany";
  }
}

const Order = ({ id, username, collectionDate, status, data }: OrderProps) => {
  const navigation = useNavigation<RootStackParamList>();

  const showDetails = () => {
    navigation.navigate("OrderDetailsView", { id, username, collectionDate, status, data });
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

const OrdersView = () => {
  const navigation = useNavigation<RootStackParamList>();
  const [ordersData, setOrdersData] = useState<OrderData[] | null>(null);
  const accessToken = useRecoilValue(userTokenSelector);

  if(!accessToken || !ordersData || ordersData.length === 0) return <Text>No orders</Text>

  const userData = jwt_decode(accessToken) as UserDecodedData;

  const DATA = [
    {
      title: "Aktywne",
      data: ordersData?.filter(order => order.status !== OrderStatus.Collected),
    },
    {
      title: "Zrealizowane",
      data: ordersData?.filter(order => order.status === OrderStatus.Collected),
    }
  ];

  async function getData() {
    const data = await getPendingUserOrders(accessToken!, (res) => {
      if(res === 'logout') return navigation.navigate('LoginScreen');

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

    if(!data || data.length === 0) return;
    setOrdersData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={orderViewStyles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(data) => {
          const formattedId = data.item.id.toString().padStart(4, '0');
          const formattedDate = formatDate(data.item.collectionDate);
          const formattedStatus = getStatus(data.item.status);

          return <Order 
            id={formattedId} 
            collectionDate={formattedDate} 
            username={userData.username}
            status={formattedStatus} 
            data={data.item.data} 
          />;
        }}
        renderSectionHeader={({ section: { title } }) => <Text style={orderViewStyles.title}>{title}</Text>}
      />
    </View>
  );
};

export default OrdersView;
