import { View, Text, SectionList, ScrollView, Image, TouchableOpacity, Button, ToastAndroid } from "react-native";
import { dinnerViewStyles } from "../../styles";
import { useEffect, useState } from "react";
import { DinnerData, DinnerItemProps, DinnerSelectProps, DinnerViewDisplayMode, DinnerViewProps, DinnerViewSelection, InnerIndex } from "../../types";
import { calculateTotalCost, cartItemsAtom, convertSelectionToCartItem } from "../utils/cart";
import { useRecoilState } from "recoil";
import { API_URL } from "@env";
import { menuAtom } from "../utils/menu";
import { DailyMenu } from "../../api/menu/types";
import { cartWeekdayAtom } from "../utils/atoms";

const baseURL = `${API_URL}image/`;
const DinnerItemView = ({ item, backgroundColor, onPress, isSelectable }: DinnerItemProps) => {
  const { name, uri } = item;
  return (
    <TouchableOpacity activeOpacity={isSelectable ? 0.5 : 1} onPress={onPress}>
      <View style={[dinnerViewStyles.itemView, { backgroundColor }]}>
        <Image style={dinnerViewStyles.itemImg} source={{ uri: `${baseURL}${uri}` }} />
        <Text style={dinnerViewStyles.itemTitle}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DinnerSelect = ({ selectedIndex, setSelectedIndex, items, isSelectable }: DinnerSelectProps) => {
  return (
    <ScrollView horizontal={true} nestedScrollEnabled={false}>
      {items.map((item, index) => {
        const backgroundColor = index === selectedIndex || !isSelectable ? "#ffffff" : "#bfbdbd";

        return (
          <DinnerItemView
            isSelectable={isSelectable}
            key={item.id}
            onPress={() => {
              if (!isSelectable) return;
              if (selectedIndex === index) setSelectedIndex!(null);
              else setSelectedIndex!(index);
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
  const { mode } = route.params;
  const isSelectable = (mode !== DinnerViewDisplayMode.INFO);

  const [sections, setSections] = useState<DinnerData[]>();
  const [selection, setSelection] = useState<DinnerViewSelection>([]);
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(null);
  
  const [menu] = useRecoilState(menuAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [cartWeekday, setCartWeekday] = useRecoilState(cartWeekdayAtom);

  useEffect(() => {
    let sections: DinnerData[];
    let defaultSelection: DinnerViewSelection = [];
    let dailyMenu: DailyMenu;

    switch (mode) {
      case DinnerViewDisplayMode.CREATE:
        {
          dailyMenu = route.params.data;
          sections = [
            { id: 0, section: "Danie główne", data: [dailyMenu.main] },
            { id: 1, section: "Dodatki", data: [dailyMenu.extras.fillers, dailyMenu.extras.salads, dailyMenu.extras.beverages] },
            { id: 2, section: "Zupa", data: [[dailyMenu.soup]] },
          ];
        }
        break;

      case DinnerViewDisplayMode.EDIT:
        {
          const cartItemData = route.params.data;

          dailyMenu = menu![cartItemData.data.weekday];
          defaultSelection = cartItemData.data.selection;

          sections = [
            { id: 0, section: "Danie główne", data: [dailyMenu.main] },
            { id: 1, section: "Dodatki", data: [dailyMenu.extras.fillers, dailyMenu.extras.salads, dailyMenu.extras.beverages] },
            { id: 2, section: "Zupa", data: [[dailyMenu.soup]] },
          ];
        }
        break;

      case DinnerViewDisplayMode.INFO: {
        const orderDinner = route.params.data;

        sections = [
          { id: 0, section: "Dania", data: [[orderDinner.dinner]] },
          { id: 1, section: "Dodatki", data: [orderDinner.extras] },
        ];
      }
    }

    setSections(sections);
    setSelection(defaultSelection);
    setDailyMenu(dailyMenu!);
  }, []);

  const handleAddToCart = () => {
    if (!dailyMenu || mode !== DinnerViewDisplayMode.CREATE) return;
    const mainDishSelection = selection.find((i) => i[0] === 0);
    if (!mainDishSelection || mainDishSelection[2] === null) return ToastAndroid.show("Musisz wybrać danie główne!", ToastAndroid.SHORT);

    const cartItem = convertSelectionToCartItem(selection, dailyMenu);
    if(cartItems.length === 0) {
      setCartWeekday(dailyMenu.weekDay);
      setCartItems([cartItem]);
    } else {
      setCartItems([...cartItems, cartItem]);
    }
    navigation.navigate('Koszyk');
  };

  const handleEditCart = () => {
    if (!selection || mode !== DinnerViewDisplayMode.EDIT) return;

    const cartItem = route.params.data;
    const index = cartItems.findIndex((i) => i.id === cartItem.id);
    if (index === -1 || !menu) return navigation.goBack();

    cartItem.data.selection = selection;
    const cost = calculateTotalCost(selection, menu[cartItem.data.weekday]);
    cartItem.cost = cost;

    cartItems[index] = cartItem;

    setCartItems([...cartItems]);
    navigation.goBack();
  };

  let onPress: any;
  let buttonTitle = "";
  switch (mode) {
    case DinnerViewDisplayMode.CREATE:
      {
        onPress = handleAddToCart;
        buttonTitle = "Dodaj do koszyka";
      }
      break;

    case DinnerViewDisplayMode.EDIT:
      {
        onPress = handleEditCart;
        buttonTitle = "Zaktualizuj zawartość";
      }
      break;

    case DinnerViewDisplayMode.INFO:
      {
        onPress = null;
      }
      break;
  }

  if (!sections) return <Text>No sections</Text>;

  return (
    <View style={dinnerViewStyles.container}>
      <SectionList
        sections={sections!}
        keyExtractor={(_, index) => index.toString()}
        renderItem={(data) => {
          if (mode === DinnerViewDisplayMode.INFO) {
            return <DinnerSelect isSelectable={isSelectable} items={data.item} />;
          }

          const changeSelected = (innerIndex: InnerIndex) => {
            const selectedIndex = selection.findIndex((i) => i[0] === data.section.id && i[1] === data.index);

            if (selectedIndex === -1) {
              setSelection([...selection, [data.section.id, data.index, innerIndex]]);
            } else {
              const selectionCopy = JSON.parse(JSON.stringify(selection));
              selectionCopy[selectedIndex][2] = innerIndex;
              setSelection(selectionCopy);
            }
          };

          const selectedObj = selection.find((i) => i[0] === data.section.id && i[1] === data.index);
          const selectedIndex = selectedObj ? selectedObj[2] : null;

          return <DinnerSelect selectedIndex={selectedIndex} setSelectedIndex={changeSelected} items={data.item} isSelectable={isSelectable} />;
        }}
        renderSectionHeader={({ section: { section } }) => <Text style={dinnerViewStyles.title}>{section}</Text>}
      />
      {onPress && (
        <View>
          <Button title={buttonTitle} onPress={onPress!} />
        </View>
      )}
    </View>
  );
};

export default DinnerView;
