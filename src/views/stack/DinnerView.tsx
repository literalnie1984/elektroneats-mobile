import { View, Text, SectionList, ScrollView, Image, TouchableOpacity, Button, ToastAndroid } from "react-native";
import { dinnerViewStyles } from "../../styles";
import { useState } from "react";
import { DinnerData, DinnerItemProps, DinnerSelectProps, DinnerViewProps, DinnerViewSelection, InnerIndex } from "../../types";
import { cartItemsAtom, convertSelectionToCartItem } from "../utils/cart";
import { useRecoilState } from "recoil";

const placeholderUri = "https://i.imgur.com/ejtUaJJ.png";
const DinnerItemView = ({ item, backgroundColor, onPress }: DinnerItemProps) => {
  const { name, uri } = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[dinnerViewStyles.itemView, { backgroundColor }]}>
        <Image style={dinnerViewStyles.itemImg} source={{ uri: placeholderUri ?? uri }} />
        <Text style={dinnerViewStyles.itemTitle}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DinnerSelect = ({ selectedIndex, setSelectedIndex, items }: DinnerSelectProps) => {
  return (
    <ScrollView horizontal={true} nestedScrollEnabled={false}>
      {items.map((item, index) => {
        const backgroundColor = index === selectedIndex ? "#ffffff" : "#bfbdbd";

        return (
          <DinnerItemView
            key={item.id}
            onPress={() => {
              if (selectedIndex === index) setSelectedIndex(null);
              else setSelectedIndex(index);
            }}
            item={item}
            backgroundColor={backgroundColor}
          />
        );
      })}
    </ScrollView>
  );
};

const DinnerView = ({ route, navigation }: DinnerViewProps) => {
  const { dailyMenu } = route.params;
  const [selection, setSelection] = useState<DinnerViewSelection>([]);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);

  const sections: DinnerData[] = [
    { id: 0, section: "Danie główne", data: [dailyMenu.main] },
    { id: 1, section: "Dodatki", data: [dailyMenu.extras.fillers, dailyMenu.extras.salads, dailyMenu.extras.beverages] },
    { id: 2, section: "Zupa", data: [[dailyMenu.soup]] },
  ];

  const handleAddToCart = () => {
    const mainDishSelection = selection.find((i) => i[0] === 0);
    if (!mainDishSelection) return ToastAndroid.show("Musisz wybrać danie główne!", ToastAndroid.SHORT);

    const cartItem = convertSelectionToCartItem(selection, dailyMenu);
    setCartItems([...cartItems, cartItem]);
    navigation.goBack();
  };

  return (
    <View style={dinnerViewStyles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(_, index) => index.toString()}
        renderItem={(data) => {
          const changeSelected = (innerIndex: InnerIndex) => {
            const selectedIndex = selection.findIndex((i) => i[0] === data.section.id && i[1] === data.index);

            if (selectedIndex === -1) {
              setSelection([...selection, [data.section.id, data.index, innerIndex]]);
            } else {
              selection[selectedIndex][2] = innerIndex;
              setSelection([...selection]);
            }
          };

          const selectedObj = selection.find((i) => i[0] === data.section.id && i[1] === data.index);
          const selectedIndex = selectedObj ? selectedObj[2] : null;

          return <DinnerSelect selectedIndex={selectedIndex} setSelectedIndex={changeSelected} items={data.item} />;
        }}
        renderSectionHeader={({ section: { section } }) => <Text style={dinnerViewStyles.title}>{section}</Text>}
      />
      <View>
        <Button title={"Dodaj do koszyka"} onPress={handleAddToCart} />
      </View>
    </View>
  );
};

export default DinnerView;
