import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, SectionList, ToastAndroid, TouchableOpacity } from "react-native";
import ExpandableView from "../../components/ExpandableView";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { OrderProps, RootStackParamList } from "../../types";
import { getPendingUserOrders } from "../../api";
import { useRecoilValue } from "recoil";
import { userTokenSelector } from "../utils/user";
import { useNavigation } from "@react-navigation/native";

const orderViewStyles = StyleSheet.create({
  container: {
    // backgroundColor: '#f5f8ff',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    color: "#5491ff",
    // fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  orderContainer: {
    marginBottom: 15,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  topPressableContainer: {
    backgroundColor: "#2246b6",
    color: "#fff",
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 40,
  },
  expandableContainer: {
    backgroundColor: "#557dfa",
    color: "#fff",
    width: "85%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  orderText: {
    color: "#fff",
    fontSize: 18,
  },
  noBottomBorder: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

const Order = (props: OrderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={{ ...orderViewStyles.orderContainer, ...(props.isRedeemed ? { opacity: 0.5 } : {}) }}>
      <Pressable onPress={() => setIsExpanded(!isExpanded)} style={{ ...orderViewStyles.topPressableContainer, ...(!isExpanded ? orderViewStyles.noBottomBorder : {}) }}>
        <Text style={orderViewStyles.orderText}>{props.id}</Text>
        <Text style={orderViewStyles.orderText}>{props.title}</Text>
        <FontAwesomeIcon icon={faChevronDown} color={"#fff"} size={18} />
      </Pressable>
      <ExpandableView expanded={isExpanded} height={200} duration={200} style={orderViewStyles.expandableContainer}>
        <Text>TODO: OrderDetails</Text>
      </ExpandableView>
    </View>
  );
};

export const newOrder = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  orderContainer: {
    backgroundColor: "#fff",
    marginBottom: 24,
    padding: 10,
    width: '90%',
    borderRadius: 10,
    shadowColor: "#0049a8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginHorizontal: 12
  },
  pairRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  pairItem: {
    marginVertical: 8
  },
  buttonText: {
    textAlign: "right",
    fontSize: 13,
    color: '#525e70',
    paddingTop: 10,
    paddingBottom: 2,
  },
  label: {
    // color: "#a3a3a3",
    color: '#abb8c9',
    textTransform: 'uppercase',
    fontSize: 12
  },
  content: {
    fontSize: 16
  }
});

export const OrderInfo = () => {
  return(
    <View style={newOrder.infoContainer}>
    <View style={newOrder.pairRow}>
      <View style={newOrder.pairItem}>
        <Text style={newOrder.label}>Nr zamówienia</Text>
        <Text style={{...newOrder.content, fontSize: 18}}>0001</Text>
      </View>
      <View style={newOrder.pairItem}>
        <Text style={newOrder.label}>Odbiorca</Text>
        <Text style={newOrder.content}>Jan Kowalski</Text>
      </View>
    </View>
    <View style={newOrder.pairRow}>
      <View style={newOrder.pairItem}>
        <Text style={newOrder.label}>Status</Text>
        <Text style={{...newOrder.content, fontWeight: "bold"}}>Zarejestrowane</Text>
      </View>
      <View style={newOrder.pairItem}>
        <Text style={newOrder.label}>Data odbioru</Text>
        <Text style={newOrder.content}>pon. | 03.04.23 | 11:15</Text>
      </View>
    </View>
  </View>
  )
}

const NewOrder = (props: OrderProps) => {
  const navigation = useNavigation<RootStackParamList>();

  const showDetails = () => {
    navigation.navigate('OrderDetailsView', {});
  }

  return (
    <View style={newOrder.container}>
      <View style={newOrder.orderContainer}>
          <TouchableOpacity onPress={() => showDetails()} activeOpacity={0.5}>
        <OrderInfo />
  
        </TouchableOpacity>

      </View>

    </View>
  );
};

const OrdersView = () => {
  const DATA = [
    {
      title: "Aktywne",
      data: [
        { id: "#004", title: "Today: 13:50 - 14:05" },
        { id: "#003", title: "Today: 11:00 - 11:15" },
        { id: "#005", title: "Today: 11:00 - 11:15" },
        { id: "#006", title: "Today: 11:00 - 11:15" },
        { id: "#073", title: "Today: 11:00 - 11:15" },
      ],
    },
    {
      title: "Zrealizowane",
      data: [
        { id: "#002", title: "Yesterday: 12:00 - 12:15" },
        { id: "#001", title: "Yesterday: 13:50 - 14:05" },
      ],
    },
  ];

  const [data, setData] = useState('');
  const accessToken = useRecoilValue(userTokenSelector);

  const getData = () => {
    console.log(accessToken)
    if(!accessToken) return setData('no token');
    getPendingUserOrders(accessToken, (res) => {
      let error = '';
      switch (res.status) {
        case 400:
          error = "Rejestracja nie powiodło się";
          break;
        case 500:
          error = "Wystąpił błąd serwera";
          break;
        default:
          error = `Wystąpił nieokreślony błąd (${res.status})`;
          break;
      }
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }).then(data => {
      if(!data) setData('no data');
      else setData(JSON.stringify(data));
    })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={orderViewStyles.container}>
      {/* <Text>Pending: {data}</Text> */}
      {/* <Button title={"get data"} onPress={() => getData()}/> */}
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.id}
        renderItem={(data) => {
          const isRedeemed = data.section.title === "Redeemed";
          return <NewOrder id={data.item.id} title={data.item.title} isRedeemed={isRedeemed} />;
        }}
        renderSectionHeader={({ section: { title } }) => <Text style={orderViewStyles.title}>{title}</Text>}
      />
    </View>
  );
};

export default OrdersView;
