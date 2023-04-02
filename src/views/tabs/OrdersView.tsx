import { useEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, SectionList, ToastAndroid, Button } from "react-native";
import ExpandableView from "../../components/ExpandableView";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { OrderProps } from "../../types";
import { orderViewStyles } from "../../styles";
import { getPendingUserOrders } from "../../api";
import { useRecoilValue } from "recoil";
import { userTokenSelector } from "../utils/user";

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

const OrdersView = () => {
  const DATA = [
    {
      title: "Pending",
      data: [
        { id: "#004", title: "Today: 13:50 - 14:05" },
        { id: "#003", title: "Today: 11:00 - 11:15" },
      ],
    },
    {
      title: "Completed",
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
      <Text>Pending: {data}</Text>
      <Button title={"get data"} onPress={() => getData()}/>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.id}
        renderItem={(data) => {
          const isRedeemed = data.section.title === "Redeemed";
          return <Order id={data.item.id} title={data.item.title} isRedeemed={isRedeemed} />;
        }}
        renderSectionHeader={({ section: { title } }) => <Text style={orderViewStyles.title}>{title}</Text>}
      />
    </View>
  );
};

export default OrdersView;
