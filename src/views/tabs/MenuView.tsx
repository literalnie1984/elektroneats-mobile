import { View, Text } from "react-native";
import { menuViewStyles } from "../../styles";
import { FlashList } from "@shopify/flash-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SegmentedSwitch from "../../components/SegmentedSwitch";
import { ViewStyle } from "react-native";
import { MenuVariantProps, MenuBlankProps, MenuItemProps, MenuItemContainerProps, Menu } from "../../types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { withTiming, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Pressable } from "react-native";

const ANIMATION_DURATION = 200;

const MenuVariant = (props: MenuVariantProps) => {
  return (
    <Animated.View style={[menuViewStyles.menuVariant, props.style, { display: props.isFolded ? "none" : "flex" }]}>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Soup:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{props.menu.soup}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Main course:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{props.menu.mainCourse}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Side dish:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{props.menu.sideDish}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Beverage:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{props.menu.beverage}</Text>
      </View>
      <Animated.View style={[menuViewStyles.menuVariantActionRow, props.actionButtonStyle, { display: props.isFolded ? "none" : "flex" }]}>
        <Pressable
          style={[menuViewStyles.menuVariantActionButton]}
          onPress={() => console.log("xd")}
          android_ripple={{
            color: "#5376df",
            borderless: false,
            radius: 80,
            foreground: false,
          }}
        >
          <Text style={menuViewStyles.menuVariantActionButtonText}>Zamów</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const MenuItem = (props: MenuItemProps) => {
  const [isFolded, setIsFolded] = useState(true);

  const handler = () => {
    setIsFolded(!isFolded);
    console.log("isFolded: " + isFolded);
  };

  return (
    <View style={menuViewStyles.menuItem}>
      <Pressable onPress={() => handler()} style={[menuViewStyles.menuItemBar, isFolded ? menuViewStyles.menuItemBarFolded : menuViewStyles.menuItemBarUnfolded]}>
        <Text style={menuViewStyles.menuItemBarDate}>{props.dateSignature}</Text>
        <FontAwesomeIcon icon={isFolded ? faChevronDown : faChevronUp} size={32} color={menuViewStyles.menuItemBarDate.color} />
      </Pressable>
      <MenuItemContainer isFolded={isFolded} containerHeight={props.containerHeight} switchHeight={props.switchHeight} contentHeight={props.containerHeight - props.switchHeight} actionButtonHeight={24} menuVariants={props.menuVariants} />
    </View>
  );
};

const MenuItemContainer = (props: MenuItemContainerProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerHeight = useSharedValue(0);
  const switchHeight = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const actionButtonHeight = useSharedValue(0);

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
    <Animated.View style={[menuViewStyles.menuItemContainer, containerAnimatedStyle]}>
      <SegmentedSwitch switchHeight={switchHeight.value} switchStyle={switchAnimatedStyle} segments={["Variant I", "Variant II", "Variant III"]} onSegmentSwitch={(selectedSegment) => setSelectedIndex(selectedSegment)} isFolded={props.isFolded} />
      <MenuVariant isFolded={props.isFolded} actionButtonStyle={actionButtonAnimatedStyle} style={contentAnimatedStyle} menu={props.menuVariants[selectedIndex]} />
    </Animated.View>
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
        <Text style={props.headingStyle}>Oops</Text>
        <Text style={props.textStyle}>It looks like we have some problem with menu fetching. Please try again later.</Text>
      </View>
    </View>
  );
};

const MenuView = () => {
  const menu: Menu = [
    {
      dateSignature: "21.03 (Czwartek)",
      menuVariants: [
        {
          soup: "Zupa pomidorowa z ryżem",
          mainCourse: "Bitki wieprzowe w sosie tzatziki",
          sideDish: "Ziemniaki",
          beverage: "Kompot",
        },
        {
          soup: "Rosół wołowy z makaronem",
          mainCourse: "Kotlet pożarski wieprzowy",
          sideDish: "Ziemniaki",
          beverage: "Kompot",
        },
        {
          soup: "Barszcz czerwony z uszkami",
          mainCourse: "Ryba po grecku",
          sideDish: "Ryż",
          beverage: "Kompot",
        },
      ],
    },
    {
      dateSignature: "22.03 (Piątek)",
      menuVariants: [
        {
          soup: "Zupa pomidorowa z ryżem",
          mainCourse: "Bitki wieprzowe w sosie tzatziki",
          sideDish: "Ziemniaki",
          beverage: "Kompot",
        },
        {
          soup: "Rosół wołowy z makaronem",
          mainCourse: "Kotlet pożarski wieprzowy",
          sideDish: "Ziemniaki",
          beverage: "Kompot",
        },
        {
          soup: "Barszcz czerwony z uszkami",
          mainCourse: "Ryba po grecku",
          sideDish: "Ryż",
          beverage: "Kompot",
        },
      ],
    },
    {
      dateSignature: "23.03 (Sobota)",
      menuVariants: [
        {
          soup: "Zupa pomidorowa z ryżem",
          mainCourse: "Bitki wieprzowe w sosie tzatziki",
          sideDish: "Ziemniaki",
          beverage: "Kompot",
        },
        {
          soup: "Rosół wołowy z makaronem",
          mainCourse: "Kotlet pożarski wieprzowy",
          sideDish: "Ziemniaki",
          beverage: "Kompot",
        },
        {
          soup: "Barszcz czerwony z uszkami",
          mainCourse: "Ryba po grecku",
          sideDish: "Ryż",
          beverage: "Kompot",
        },
      ],
    },
  ];

  //const menu = Array();

  return (
    <GestureHandlerRootView style={menuViewStyles.root}>
      {menu.length > 0 ? (
        <FlashList
          data={menu}
          renderItem={({ item }) => {
            return <MenuItem dateSignature={item.dateSignature} menuVariants={item.menuVariants} containerHeight={300} switchHeight={32} />;
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
    </GestureHandlerRootView>
  );
};

export default MenuView;
