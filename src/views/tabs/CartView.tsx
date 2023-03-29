import { View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { cartViewStyles } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FlashList } from "@shopify/flash-list";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const ANIMATION_DURATION = 300;

const CartItem = (props) => {
  const ITEM_EXPANDED_HEIGHT = 150;
  const ITEM_FOLDED_HEIGHT = 80;

  const height = useSharedValue(ITEM_EXPANDED_HEIGHT);
  const optionsHeight = useSharedValue(100);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    height.value = withTiming(isExpanded ? ITEM_EXPANDED_HEIGHT : ITEM_FOLDED_HEIGHT, { duration: ANIMATION_DURATION });
    optionsHeight.value = withTiming(isExpanded ? 100 : 0, { duration: ANIMATION_DURATION });
  }, [isExpanded]);

  const itemAnimatedStyle = useAnimatedStyle(() => ({ height: height.value }));
  const optionsAnimatedStyle = useAnimatedStyle(() => ({
    height: optionsHeight.value + "%",
    display: optionsHeight.value === 0 ? "none" : "flex",
    opacity: optionsHeight.value / 100,
  }));

  return props.type === "meal" ? (
    <Animated.View style={[cartViewStyles.cartMeal, itemAnimatedStyle]}>
      <Pressable style={cartViewStyles.cartMealInfoBar} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={cartViewStyles.cartMealName}>Obiad 1</Text>
        <Text style={cartViewStyles.cartMealCost}>21.37zł</Text>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} color={cartViewStyles.cartMealInfoIcon.color} size={cartViewStyles.cartMealInfoIcon.width} />
      </Pressable>
      <Animated.View style={[cartViewStyles.cartMealActionsBar, optionsAnimatedStyle]}>
        <Pressable
          style={[cartViewStyles.cartMealActionButton]}
          onPress={props.mealEditHandler}
          android_ripple={{
            color: "#e5e5e6",
            borderless: false,
            radius: 100,
            foreground: false,
          }}
        >
          <Text style={cartViewStyles.cartMealActionLabel}>Sprawdź/Zmień skład</Text>
        </Pressable>
        <View style={cartViewStyles.cartMealOptions}>
          <Text>TODO</Text>
        </View>
      </Animated.View>
    </Animated.View>
  ) : (
    <View>
      <Text>TODO</Text>
    </View>
  );
};

const CartSummary = (props) => {
  const FOLDED_HEIGHT = 40;
  const EXPANDED_HEIGHT = 225;

  const [isExpanded, setIsExpanded] = useState(true);
  const containerHeight = useSharedValue(EXPANDED_HEIGHT);
  const elementsHeight = useSharedValue(100);

  useEffect(() => {
    containerHeight.value = withTiming(isExpanded ? EXPANDED_HEIGHT : FOLDED_HEIGHT, { duration: ANIMATION_DURATION });
    elementsHeight.value = withTiming(isExpanded ? 100 : 0, { duration: ANIMATION_DURATION });
  }, [isExpanded]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
    };
  });

  const elementsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: elementsHeight.value / 100 }, { translateY: 100 - elementsHeight.value }],
      opacity: elementsHeight.value / 100,
      display: containerHeight.value !== FOLDED_HEIGHT ? "flex" : "none",
    };
  });

  return (
    <Animated.View style={[cartViewStyles.summary, containerAnimatedStyle]}>
      <Pressable style={cartViewStyles.summaryInfoHeader} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={cartViewStyles.summaryInfoHeaderContent}>Podsumowanie</Text>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} color={cartViewStyles.summaryInfoHeaderIcon.color} size={cartViewStyles.summaryInfoHeaderIcon.width} />
      </Pressable>
      <View style={cartViewStyles.summaryInfo}>
        <Animated.View style={[cartViewStyles.summaryInfoRows, elementsAnimatedStyle]}>
          <View style={cartViewStyles.summaryInfoRow}>
            <Text style={cartViewStyles.summaryInfoRowLabel}>Suma:</Text>
            <Text style={cartViewStyles.summaryInfoRowContent}>{props.cartValue}</Text>
          </View>
          <View style={cartViewStyles.summaryInfoRow}>
            <Text style={cartViewStyles.summaryInfoRowLabel}>Data odbioru:</Text>
            <Text style={cartViewStyles.summaryInfoRowContent}>{props.cartPickupDate}</Text>
          </View>
        </Animated.View>
      </View>
      <Animated.View style={[cartViewStyles.summaryActionsRow, elementsAnimatedStyle]}>
        <Pressable
          style={cartViewStyles.summaryActionButton}
          android_ripple={{
            color: "#2d56d2",
            borderless: false,
            radius: 100,
            foreground: false,
          }}
          onPress={() => console.log("aha")}
        >
          <Text style={cartViewStyles.summaryActionLabel}>Zamawiam i płacę</Text>
        </Pressable>
        <Pressable
          style={cartViewStyles.summaryActionButton}
          android_ripple={{
            color: "#2d56d2",
            borderless: false,
            radius: 80,
            foreground: false,
          }}
          onPress={() => console.log("bywa")}
        >
          <Text style={cartViewStyles.summaryActionLabel}>Wyczyść</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const CartPanel = (props) => {
  return (
    <View style={cartViewStyles.cartPanel}>
      <Pressable style={cartViewStyles.cartPanelHeader}>
        <Text style={cartViewStyles.cartPanelHeaderContent}>Zawartość koszyka</Text>
      </Pressable>
      <CartItem type={"meal"} />
      <CartItem type={"meal"} />
      <CartItem type={"meal"} />
    </View>
  );
};

/**
		<FlashList 
								data={}
								renderItem={}
								ListEmptyComponent={}
								ListHeaderComponent={<Text style={cartViewStyles.cartPanelHeader}>Twoje zamówienia</Text>}
						/>
**/

const CartView = () => {
  return (
    <View style={cartViewStyles.root}>
      <CartPanel />
      <CartSummary cartValue={21.37} cartPickupDate={"coś"} />
    </View>
  );
};

export default CartView;
