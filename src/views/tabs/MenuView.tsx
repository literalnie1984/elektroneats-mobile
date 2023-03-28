import { View, Text } from "react-native";
import { menuViewStyles } from "../../styles";
import { FlashList } from "@shopify/flash-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import SegmentedSwitch from "../../components/SegmentedSwitch";
import { ViewStyle } from "react-native";
import { MenuVariantProps, MenuBlankProps, MenuItemProps, MenuItemContainerProps } from "../../types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { withTiming, useAnimatedStyle, useSharedValue, set } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { menuSelector, generateVariantTags, countVariants, generateBeverageString, generateExtrasString } from "../utils/menu";
import { fetchMenu } from "../../api/menu";

const API_URL = process.env.API_URL;

const ANIMATION_DURATION = 300;

const MenuVariant = (props: MenuVariantProps) => {

  const navigation = useNavigation();

  return (
    <Animated.View style={[menuViewStyles.menuVariant, props.style]}>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Soup:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{props.soup.name}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Main course:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{props.main.name}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Extras:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{generateExtrasString(props.extras)}</Text>
      </View>
      <View style={menuViewStyles.menuVariantRow}>
        <Text style={menuViewStyles.menuVariantRowTitle}>Beverage:</Text>
        <Text style={menuViewStyles.menuVariantElement}>{generateBeverageString(props.beverage)}</Text>
      </View>
      <Animated.View style={[menuViewStyles.menuVariantActionRow, props.actionButtonStyle ]}>
        <Pressable
          style={menuViewStyles.menuVariantActionButton}
          onPress={() => navigation.navigate("DinnerView", {  })}
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
      <MenuItemContainer 
		isFolded={isFolded} 
		containerHeight={props.containerHeight} 
		switchHeight={props.switchHeight} 
		contentHeight={props.containerHeight - props.switchHeight} 
		actionButtonHeight={40} 
		menuContent={props.menuContent} 
      />
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
    <Animated.View style={[menuViewStyles.menuItemContainer, containerAnimatedStyle]}>
      <SegmentedSwitch 
		switchHeight={switchHeight.value} 
		switchStyle={switchAnimatedStyle} 
		segments={generateVariantTags(countVariants(props.menuContent))} 
		onSegmentSwitch={(selectedSegment) => setSelectedIndex(selectedSegment)} 
		isFolded={props.isFolded} />
      <MenuVariant 
	    isFolded={props.isFolded} 
		actionButtonStyle={actionButtonAnimatedStyle} 
		style={contentAnimatedStyle} 
		menu={props.menuContent}
		main={props.menuContent.main[selectedIndex]}
		soup={props.menuContent.soup[selectedIndex]}
		extras={props.menuContent.extras}
		beverage={props.menuContent.beverage}
      />
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

  const menu = useRecoilValue(menuSelector);

  return (
    <GestureHandlerRootView style={menuViewStyles.root}>
      {menu.length > 0 ? (
        <FlashList
          data={menu}
          renderItem={({ item }) => {
            return <MenuItem dateSignature={item.dateSignature} menuContent={item.menuContent} containerHeight={300} switchHeight={32} />;
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
		<Pressable
				style={menuViewStyles.menuVariantActionButton}
				onPress={fetchMenu}
		>
				<Text style={menuViewStyles.menuVariantActionButtonText}> Fetch Menu (debug)</Text>
		</Pressable>
    </GestureHandlerRootView>
  );
};

export default MenuView;
