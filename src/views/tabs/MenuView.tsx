import { View, Text, Pressable, Alert } from "react-native";
import { menuViewStyles } from "../../styles";
import { FlashList } from "@shopify/flash-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SegmentedSwitch from "../../components/SegmentedSwitch";
import { ViewStyle } from "react-native";
import { MenuVariantProps, MenuBlankProps, MenuItemProps, MenuItemContainerProps, RootStackParamList, DinnerViewDisplayMode } from "../../types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { withTiming, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuSelector, generateVariantTags, getDayOfWeek } from "../utils/menu";
import { getDayOfWeekMnemonic } from "../../api/utils";
import { cartWeekdayAtom } from "../utils/atoms";
import { cartItemsAtom } from "../utils/cart";

const ANIMATION_DURATION = 300;

const MenuVariant = (props: MenuVariantProps) => {
  const navigation = useNavigation<RootStackParamList>();
  const [cartWeekday, setCartWeekday] = useRecoilState(cartWeekdayAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);

  const { main, soup, extras } = props.dailyMenu;
  const { beverages, fillers, salads } = extras;
  const allExtras = [...fillers, ...salads];

  const allExtrasStr = allExtras.map((i) => i.name).join(", ");
  const beveragesStr = beverages.map((i) => i.name).join(", ");

  const onPress = () => {
    if (cartWeekday !== -1 && props.dailyMenu.weekDay !== cartWeekday) {
      Alert.alert(
        "Nie możesz złożyć zamówienia na inny dzień",
        `Obecnie w koszyku masz dodany obiad na ${getDayOfWeek(cartWeekday)}. Czy chcesz wyczyścić koszyk i kontynuować?`,
        [
          {
            text: "Wyczyść",
            onPress: () => {
              setCartItems([]);
              setCartWeekday(-1);
              navigation.navigate("DinnerView", {
                mode: DinnerViewDisplayMode.CREATE,
                data: props.dailyMenu,
              });
              return;
            },
          },
          {
            text: "Anuluj",
            onPress: () => {
              return;
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      navigation.navigate("DinnerView", {
        mode: DinnerViewDisplayMode.CREATE,
        data: props.dailyMenu,
      });
    }
  };

  return (
    <Animated.View style={[menuViewStyles.menuVariant, props.style]}>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Zupa:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{soup.name}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Danie główne:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{main[props.selectedIndex].name}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Dodatki:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{allExtrasStr}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Napoje:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{beveragesStr}</Text>
      </View>
      <Animated.View style={[menuViewStyles.menuVariantActionRow, props.actionButtonStyle]}>
        <Pressable
          style={menuViewStyles.menuVariantActionButton}
          onPress={onPress}
          android_ripple={{
            color: "#5376df",
            borderless: false,
            radius: 80,
            foreground: false,
          }}
        >
          <Text style={menuViewStyles.menuVariantActionButtonText}>Złóż zamówienie</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <View style={menuViewStyles.menuItem}>
      {/* <View style={menuViewStyles.menuItemBar}> */}
      <Text style={menuViewStyles.menuItemBarDate}>{props.dateSignature}</Text>
      {/* </View> */}
      <MenuItemContainer dailyMenu={props.dailyMenu} isFolded={false} containerHeight={props.containerHeight} switchHeight={props.switchHeight} contentHeight={props.containerHeight - props.switchHeight} actionButtonHeight={40} />
    </View>
  );
};

const MenuItemContainer = (props: MenuItemContainerProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerHeight = useSharedValue(props.isFolded == true ? 0 : props.containerHeight);
  const switchHeight = useSharedValue(props.isFolded == true ? 0 : props.switchHeight);
  const contentHeight = useSharedValue(props.isFolded == true ? 0 : props.contentHeight);
  const actionButtonHeight = useSharedValue(props.isFolded == true ? 0 : props.actionButtonHeight);

  useEffect(() => {
    containerHeight.value = withTiming(props.isFolded == true ? 0 : props.containerHeight, { duration: ANIMATION_DURATION });
    switchHeight.value = withTiming(props.isFolded == true ? 0 : props.switchHeight, { duration: ANIMATION_DURATION });
    contentHeight.value = withTiming(props.isFolded == true ? 0 : props.contentHeight, { duration: ANIMATION_DURATION });
    actionButtonHeight.value = withTiming(props.isFolded == true ? 0 : props.actionButtonHeight, { duration: ANIMATION_DURATION });
  }, [props.isFolded, props.contentHeight, props.containerHeight, props.switchHeight]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: contentHeight.value,
    };
  });

  const switchAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: switchHeight.value,
    };
  });

  const actionButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: actionButtonHeight.value,
    };
  });

  return (
    <View style={menuViewStyles.menuItemContainer}>
      <SegmentedSwitch switchHeight={switchHeight.value} switchStyle={switchAnimatedStyle} segments={generateVariantTags(props.dailyMenu)} onSegmentSwitch={(selectedSegment) => setSelectedIndex(selectedSegment)} isFolded={props.isFolded} />
      <MenuVariant dailyMenu={props.dailyMenu} selectedIndex={selectedIndex} isFolded={props.isFolded} actionButtonStyle={actionButtonAnimatedStyle} style={contentAnimatedStyle} />
    </View>
  );
};

const MenuItemSeparator = (props: { style: ViewStyle }) => {
  return <View style={props.style} />;
};

const MenuBlank = (props: MenuBlankProps) => {
  return (
    <View style={props.containerStyle}>
      <View style={props.windowStyle}>
        <FontAwesomeIcon icon={faFaceSadTear} size={props.iconStyle.fontSize} color={String(props.iconStyle.color)} />
        <Text style={props.headingStyle}>Ups</Text>
        <Text style={props.textStyle}>Wystąpił błąd podczas pobierania jadłospisu. Spróbuj ponownie później..</Text>
      </View>
    </View>
  );
};

const MenuView = () => {
  const menu = useRecoilValue(menuSelector);
  if (!menu)
    return (
      <MenuBlank
        containerStyle={menuViewStyles.menuBlankContainerStyle}
        windowStyle={menuViewStyles.menuBlankWindowStyle}
        iconStyle={menuViewStyles.menuBlankIconStyle}
        headingStyle={menuViewStyles.menuBlankHeadingStyle}
        textStyle={menuViewStyles.menuBlankTextStyle}
      />
    );

  return (
    <GestureHandlerRootView style={menuViewStyles.root}>
      {menu !== null ? (
        <FlashList
          data={menu}
          renderItem={({ item }) => {
            return <MenuItem dateSignature={getDayOfWeekMnemonic(item.weekDay)!} dailyMenu={item} containerHeight={300} switchHeight={32} />;
          }}
          estimatedItemSize={200}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={menuViewStyles.menu}
          ItemSeparatorComponent={() => <MenuItemSeparator style={menuViewStyles.menuItemSeparator} />}
        />
      ) : (
        <MenuBlank
          containerStyle={menuViewStyles.menuBlankContainerStyle}
          windowStyle={menuViewStyles.menuBlankWindowStyle}
          iconStyle={menuViewStyles.menuBlankIconStyle}
          headingStyle={menuViewStyles.menuBlankHeadingStyle}
          textStyle={menuViewStyles.menuBlankTextStyle}
        />
      )}
      {/* <Pressable style={menuViewStyles.menuVariantActionButton} onPress={getWeeklyMenu}>
        <Text style={menuViewStyles.menuVariantActionButtonText}> Fetch Menu (debug)</Text>
      </Pressable> */}
    </GestureHandlerRootView>
  );
};

export default MenuView;
