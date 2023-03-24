import { useState } from "react";
import { View, Text, Pressable, SafeAreaView, SectionList } from "react-native";
import ExpandableView from "../utils/ExpandableView";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { OrderProps } from "../../types";
import { orderViewStyles } from "../../styles";

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
      title: "Active",
      data: [
        { id: "#004", title: "Today: 13:50 - 14:05" },
        { id: "#003", title: "Today: 11:00 - 11:15" },
      ],
    },
    {
      title: "Redeemed",
      data: [
        { id: "#002", title: "Yesterday: 12:00 - 12:15" },
        { id: "#001", title: "Yesterday: 13:50 - 14:05" },
      ],
    },
  ];

  return (
    <SafeAreaView style={orderViewStyles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.id}
        renderItem={(data) => {
          const isRedeemed = data.section.title === "Redeemed";
          return <Order id={data.item.id} title={data.item.title} isRedeemed={isRedeemed} />;
        }}
        renderSectionHeader={({ section: { title } }) => <Text style={orderViewStyles.title}>{title}</Text>}
      />
    </SafeAreaView>
  );
};

export default OrdersView;
