import { View, Text, Pressable, Alert, Image, ToastAndroid } from "react-native";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { cartViewStyles, paymentViewStyle } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight, faFaceMeh } from "@fortawesome/free-solid-svg-icons";
import { FlashList } from "@shopify/flash-list";
import Animated, { acc, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { CartItem, CartItemProps, CartItemType, CartPanelProps, CartSummaryProps } from "../../types/index";
import { getDayOfWeekMnemonic } from "../../api/utils";
import { calculateTotalCost, cartItemsAtom, convertCartItemsForApi, getPriceAsNumber } from "../utils/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import { createOrders, getBalance, getClientData } from "../../api";
import { userTokenSelector } from "../utils/user";
import { menuSelector } from "../utils/menu";
import { Modal } from "react-native";
import PaymentView from "../../components/PaymentView";
import {balanceAtom, walletAtom} from "../utils/wallet";

const ANIMATION_DURATION = 300;
const placeholderImage = "https://i.imgur.com/ejtUaJJ.png";



const CartItemView = ({ index, data, type, cost, amount, handleAmountUpdate }: CartItemProps) => {
  const ITEM_EXPANDED_HEIGHT = 150;
  const ITEM_FOLDED_HEIGHT = 80;

  const height = useSharedValue(ITEM_EXPANDED_HEIGHT);
  const optionsHeight = useSharedValue(100);
  const imageHeight = useSharedValue(100);
  const [isExpanded, setIsExpanded] = useState(true);

  const mealEditHandler = () => {
    console.log("bruh");
  };

  useEffect(() => {
    height.value = withTiming(isExpanded ? ITEM_EXPANDED_HEIGHT : ITEM_FOLDED_HEIGHT, { duration: ANIMATION_DURATION });
    optionsHeight.value = withTiming(isExpanded ? 100 : 0, { duration: ANIMATION_DURATION });
    imageHeight.value = withTiming(isExpanded ? 150 : 80, { duration: ANIMATION_DURATION });
  }, [isExpanded]);

  const itemAnimatedStyle = useAnimatedStyle(() => ({ height: height.value }));
  const optionsAnimatedStyle = useAnimatedStyle(() => ({
    height: optionsHeight.value + "%",
    display: optionsHeight.value === 0 ? "none" : "flex",
    opacity: optionsHeight.value / 100,
  }));
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    height: imageHeight.value,
    width: imageHeight.value,
  }));

  return type === CartItemType.Dinner ? (
    <Animated.View style={[cartViewStyles.cartMeal, itemAnimatedStyle]}>
      <Pressable style={cartViewStyles.cartMealInfoBar} onPress={() => setIsExpanded(!isExpanded)}>
        <Animated.View style={cartViewStyles.cartMealImageContainer}>
          <Image style={cartViewStyles.cartMealImage} source={{ uri: placeholderImage }} />
        </Animated.View>
        <Text style={cartViewStyles.cartMealName}>{`${index + 1}. Obiad`}</Text>
        <Text style={cartViewStyles.cartMealCost}>{cost ? `${Number(cost * amount).toFixed(2)} zł` : `nic`}</Text>
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} color={cartViewStyles.cartMealInfoIcon.color} size={cartViewStyles.cartMealInfoIcon.width} />
      </Pressable>
      <Animated.View style={[cartViewStyles.cartMealActionsBar, optionsAnimatedStyle]}>
        <Pressable
          style={[cartViewStyles.cartMealActionButton]}
          onPress={mealEditHandler}
          android_ripple={{
            color: "#e5e5e6",
            borderless: false,
            radius: 100,
            foreground: false,
          }}
        >
          <Text style={cartViewStyles.cartMealActionLabel}>Sprawdź/Zmień skład</Text>
        </Pressable>
        <View style={cartViewStyles.cartMealAmountOptions}>
          <Pressable style={cartViewStyles.cartMealAmountButton} onPress={() => handleAmountUpdate(index, -1)} hitSlop={10}>
            <FontAwesomeIcon icon={faChevronLeft} color={cartViewStyles.cartMealAmountButtonIcon.color} size={cartViewStyles.cartMealAmountButtonIcon.width} />
          </Pressable>
          <Text style={cartViewStyles.cartMealAmountLabel}>{amount}</Text>
          <Pressable style={cartViewStyles.cartMealAmountButton} onPress={() => handleAmountUpdate(index, 1)} hitSlop={10}>
            <FontAwesomeIcon icon={faChevronRight} color={cartViewStyles.cartMealAmountButtonIcon.color} size={cartViewStyles.cartMealAmountButtonIcon.width} />
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  ) : (
    <Animated.View style={[cartViewStyles.cartItem, itemAnimatedStyle]}>
      <Animated.View style={cartViewStyles.cartItemImageContainer}>
        <Animated.Image style={[cartViewStyles.cartItemImage, imageAnimatedStyle]} source={{ uri: placeholderImage }} />
      </Animated.View>
      <Animated.View style={cartViewStyles.cartItemMainContainer}>
        <Pressable style={cartViewStyles.cartItemInfoBar} onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={cartViewStyles.cartMealName}>{`${index + 1}. Przedmiot`}</Text>
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} color={cartViewStyles.cartMealInfoIcon.color} size={cartViewStyles.cartMealInfoIcon.width} />
        </Pressable>
        <Animated.View style={[cartViewStyles.cartMealActionsBar, optionsAnimatedStyle]}>
          <View style={cartViewStyles.cartMealAmountOptions}>
            <Text style={cartViewStyles.cartMealCost}>{cost ? `${Number(cost * amount).toFixed(2)} zł` : `nic`}</Text>
            <Pressable style={cartViewStyles.cartMealAmountButton} onPress={() => handleAmountUpdate(index, -1)} hitSlop={10}>
              <FontAwesomeIcon icon={faChevronLeft} color={cartViewStyles.cartMealAmountButtonIcon.color} size={cartViewStyles.cartMealAmountButtonIcon.width} />
            </Pressable>
            <Text style={cartViewStyles.cartMealAmountLabel}>{amount}</Text>
            <Pressable style={cartViewStyles.cartMealAmountButton} onPress={() => handleAmountUpdate(index, 1)} hitSlop={10}>
              <FontAwesomeIcon icon={faChevronRight} color={cartViewStyles.cartMealAmountButtonIcon.color} size={cartViewStyles.cartMealAmountButtonIcon.width} />
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const CartSummary = ({ cartItems, setCartItems, cartPickupDate, handlePickupDateUpdate, handleCartClearingRequest, isExpanded, setIsExpanded, usePayment }: CartSummaryProps) => {
  const FOLDED_HEIGHT = 40;
  const EXPANDED_HEIGHT = 225;

  const containerHeight = useSharedValue(EXPANDED_HEIGHT);
  const elementsHeight = useSharedValue(100);
  const [cost, setCost] = useState<number | null>(summarizeCost(cartItems));
  const accessToken = useRecoilValue(userTokenSelector);
  const [ wallet, setWallet ] = useRecoilState(walletAtom)
  const [ balance, setBalance ] = useRecoilState(balanceAtom);
  const menu = useRecoilValue(menuSelector);

  useEffect(() => {
    setCost(summarizeCost(cartItems));
  }, [cartItems]);

  useEffect(() => {
    containerHeight.value = withTiming(isExpanded ? EXPANDED_HEIGHT : FOLDED_HEIGHT, { duration: ANIMATION_DURATION });
    elementsHeight.value = withTiming(isExpanded ? 100 : 0, { duration: ANIMATION_DURATION });
  }, [isExpanded]);

  const handleOrdering = async () => {

    // if(!cartPickupDate) return ToastAndroid.show('You must select pickup date before doing that!', ToastAndroid.SHORT);
    if (!menu) return console.log("no menu");

    const body = convertCartItemsForApi(menu, cartItems, cartPickupDate);
	const totalCost = cartItems.reduce( ( acc = 0, item ) => {
		if( item.type === CartItemType.Dinner ){
				return acc + (calculateTotalCost( item.data.selection, menu[item.data.weekday] ) * item.amount);
		}
    }, 0 );

    if(!body) return console.log('convertion went wrong');
   
	await getClientData( accessToken, ( res ) => {
		console.log(res.status);
		console.log(res?.err ? res?.err.status : 'pass');
    } )
	.then( (value) => setWallet( value )  )
    .then( () => getBalance( accessToken, ( res ) => {
		console.log(res.status);
		console.log(res?.err ? res?.err.status : 'pass');
    } ) )
	.then( (value) => setBalance( value !== null ? value / 100 : value ) )
    .then( () => usePayment({ orderBody: body, orderValue: totalCost, pickupDate: cartPickupDate }) );

    /*let error = '';
    const hasSucceed = await createOrders(body, accessToken, (res) => {
      console.log(res.status);

      switch (res.status) {
        case 400:
          error = "Dodanie zamówienia nie powiodło się";
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

    if (hasSucceed) {
      setCartItems([]);
      
      ToastAndroid.show("Order has been added", ToastAndroid.SHORT);
    }*/
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
    };
  });

  const elementsAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: elementsHeight.value / 100 }, { translateY: 100 - elementsHeight.value }],
      opacity: elementsHeight.value / 100,
      overflow: "hidden",
      display: containerHeight.value !== FOLDED_HEIGHT ? "flex" : "none",
    };
  });

  return (
    <Animated.View style={[cartViewStyles.summary, containerAnimatedStyle]}>
      <Pressable style={cartViewStyles.summaryInfoHeader} onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={cartViewStyles.summaryInfoHeaderContent}>Podsumowanie</Text>
        <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronUp} color={cartViewStyles.summaryInfoHeaderIcon.color} size={cartViewStyles.summaryInfoHeaderIcon.width} />
      </Pressable>
      <View style={cartViewStyles.summaryInfo}>
        <Animated.View style={[cartViewStyles.summaryInfoRows, elementsAnimatedStyle]}>
          <View style={cartViewStyles.summaryInfoRow}>
            <Text style={cartViewStyles.summaryInfoRowLabel}>Suma:</Text>
            <Text style={cartViewStyles.summaryInfoRowContent}>{cost ? Number(cost).toFixed(2) + " zł" : "dodaj produkty, a zobaczysz tu ich łączną wartość"}</Text>
          </View>
          <View style={cartViewStyles.summaryInfoRow}>
            <Text style={cartViewStyles.summaryInfoRowLabel}>Data odbioru:</Text>
            <Text style={cartViewStyles.summaryInfoRowContent}>{cartPickupDate === null ? "BRAK. Ustaw ją zanim sfinalizujesz zakup!" : parseDateToString(cartPickupDate)}</Text>
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
          onPress={handleOrdering}
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
          onPress={handlePickupDateUpdate}
        >
          <Text style={cartViewStyles.summaryActionLabel}>Zmień datę odbioru</Text>
        </Pressable>
        <Pressable
          style={cartViewStyles.summaryActionButton}
          android_ripple={{
            color: "#2d56d2",
            borderless: false,
            radius: 80,
            foreground: false,
          }}
          onPress={handleCartClearingRequest}
        >
          <Text style={cartViewStyles.summaryActionLabel}>Wyczyść</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const CartPanelListItemSeparator = () => <View style={{ height: 20 }} />;

const CartPanel = ({ data, handleAmountUpdate }: { data: CartItem[]; handleAmountUpdate: (index: number, amountUpdate: number) => void }) => {
  return (
    <View style={cartViewStyles.cartPanel}>
      <Text style={cartViewStyles.cartPanelHeaderContent}>Zawartość koszyka</Text>
      <FlashList
        contentContainerStyle={cartViewStyles.cartPanelList}
        data={data}
        renderItem={({ item, index }: { item: CartItem; index: number }) => {
          return <CartItemView index={index} cost={item.cost} data={item.data} type={item.type} amount={item.amount} handleAmountUpdate={(index, amountUpdate) => handleAmountUpdate(index, amountUpdate)} />;
        }}
        estimatedItemSize={150}
        keyExtractor={(_, index) => String(index)}
        ListEmptyComponent={<CartPanelBlank />}
        ItemSeparatorComponent={CartPanelListItemSeparator}
        drawDistance={15}
      />
    </View>
  );
};

const CartPanelBlank = () => {
  return (
    <View style={cartViewStyles.cartPanelBlank}>
      <FontAwesomeIcon icon={faFaceMeh} color={cartViewStyles.cartPanelBlankIcon.color} size={cartViewStyles.cartPanelBlankIcon.width} />
      <Text style={cartViewStyles.cartPanelBlankHeader}>Twój koszyk jest pusty</Text>
      <Text style={cartViewStyles.cartPanelBlankText}>Śmiało! Dodaj swoje ulubione produkty i spróbuj mnie wypełnić</Text>
    </View>
  );
};

const showDatePicker = (currentDate: Date | null, setDate: Dispatch<SetStateAction<Date | null>>, cartItems: CartItem[]) => {
  DateTimePickerAndroid.open({
    value: currentDate || new Date(),
    mode: "date",
    is24Hour: true,
    onChange: (event: DateTimePickerEvent, date?: Date | undefined) => {
      if (event.type === "set") {
        if (date) {
          if (date.getDay() === 0) {
            Alert.alert("Date error", "Date exceeds range Monday - Saturday", [{ text: "OK", onPress: () => console.log("ok") }], { cancelable: true });
            return;
          }
          if (!verifyPickupDates(cartItems, date)) {
            Alert.alert("Date error", "You cannot select this date: week days mismatch", [{ text: "OK", onPress: () => console.log("ok") }], { cancelable: true });
            return;
          }
          DateTimePickerAndroid.open({
            mode: "time",
            value: date,
            is24Hour: true,
            onChange: (event: DateTimePickerEvent, time?: Date | undefined) => {
              if (event.type === "set") {
                if (time) setDate(time);
              } else {
                Alert.alert("Date error", "Time picking dismissed", [{ text: "OK", onPress: () => console.log("ok") }], { cancelable: true });
                return;
              }
            },
          });
        }
      } else {
        Alert.alert("Date error", "Date picking dismissed", [{ text: "OK", onPress: () => console.log("ok") }], { cancelable: true });
        return;
      }
    },
  });
  return;
};

export const parseDateToString = (date: Date) => {
  let date_string = "";
  date_string += `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth()).padStart(2, "0")}.${date.getFullYear()} `;
  date_string += `(${getDayOfWeekMnemonic(date.getDay() - 1)}) - `;
  date_string += `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  return date_string;
};

export const summarizeCost = (data: CartItem[]) => {
  if (data.length === 0) return null;

  let cost = 0;
  data.map((item) => {
    if (!item) return;
    cost += item.cost * item.amount;
  });

  return cost || null;
};

const verifyPickupDates = (data: CartItem[], newDate: Date) => {
  try {
    data.map((item) => {
      if (item.type === CartItemType.Dinner) {
        if (newDate.getDay() !== item.data.weekday + 1) {
          throw new Error("Week days mismatched");
        }
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const CartView = ({ navigation }) => {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState<boolean>(true);
  const [date, setDate] = useState<Date | null>(null);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cartOrder, setCartOrder] = useState<{ order: cartItem[]; pickupDate: Date } | null>(null);

  const updateItemAmount = (index: number, amountUpdate: number) => {
    console.log(`Changed value of ${index} by: ${amountUpdate}`);
    let cartList = JSON.parse(JSON.stringify(cartItems));
    cartList[index].amount += amountUpdate;
    if (cartList[index].amount <= 0) {
      Alert.alert(
        "Item deletion",
        "Are you sure you want to remove this item from cart?",
        [
          {
            text: "Yes",
            onPress: () => {
              cartList = cartList.filter((item: CartItem) => item.amount > 0);
              setCartItems(cartList);
              return;
            },
          },
          {
            text: "No",
            onPress: () => {
              cartList[index].amount += 1;
              setCartItems(cartList);
              return;
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            cartList[index].amount += 1;
            setCartItems(cartList);
            return;
          },
        }
      );
    } else setCartItems(cartList);

    return;
  };

  const clearCart = () => {
    console.log("Cart cleared");
    setCartItems([]);
  };

  const debugResetCart = () => {
    setCartItems([
      {
        type: CartItemType.Dinner,
        cost: 21.37,
        amount: 1,
        data: {
          selection: [],
          weekday: 2,
        },
      },
      {
        type: CartItemType.Dinner,
        cost: 42.69,
        amount: 2,
        data: {
          selection: [],
          weekday: 2,
        },
      },
      {
        type: CartItemType.Dinner,
        cost: 50.0,
        amount: 1,
        data: {
          selection: [],
          weekday: 2,
        },
      },
      {
        type: CartItemType.Dinner,
        cost: 99.99,
        amount: 3,
        data: {
          selection: [],
          weekday: 2,
        },
      },
    ]);
  };

  return (
    <View style={cartViewStyles.root}>
      <CartPanel data={cartItems} handleAmountUpdate={(index, amountUpdate) => updateItemAmount(index, amountUpdate)} />
      <CartSummary
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartPickupDate={date}
        handlePickupDateUpdate={() => showDatePicker(date, setDate, cartItems)}
        handleCartClearingRequest={clearCart}
        isExpanded={isSummaryExpanded}
        setIsExpanded={setIsSummaryExpanded}
		usePayment={({ orderBody, orderValue, pickupDate }) => navigation.navigate("PaymentView", { orderBody, orderValue, pickupDate }) }
      />
      <Pressable style={cartViewStyles.cartPanelDebugButton} onPress={debugResetCart}>
        <Text style={cartViewStyles.cartPanelDebugButtonText}> Reset cart (debug)</Text>
      </Pressable>
    </View>
  );
};
