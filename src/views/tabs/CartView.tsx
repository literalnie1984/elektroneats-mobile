import { View, Text, Pressable, Alert, Image, ToastAndroid } from "react-native";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { cartViewStyles, paymentViewStyle } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronUp, faChevronDown, faFaceMeh, faPlus, faMinus, faGear } from "@fortawesome/free-solid-svg-icons";
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
import { orderContent } from "../stack/OrderDetailsView";
import { newOrder, orderViewStyles } from "./OrdersView";
import { COLORS } from "../colors";
import PaymentView from "../../components/PaymentView";
import {balanceAtom, walletAtom} from "../utils/wallet";
import {OrderBody} from "../../api/orders/types";

const ANIMATION_DURATION = 300;
const placeholderUri = "https://i.imgur.com/ejtUaJJ.png";

const CartItemView = ({ index, item, handleAmountUpdate }: CartItemProps) => {
  const { data, type, cost, amount } = item;
  if(type === CartItemType.Item) return <View>TODO</View>;
  
  const mealEditHandler = () => {
    console.log("bruh");
  }

  return(
    <View style={cartViewStyles.cartMeal}>
      <View style={cartViewStyles.cartMealInfoBar}>
        <View style={cartViewStyles.cartMealImageContainer}>
          <Image style={{width: 48, height: 48 }} source={{ uri: placeholderUri }} />
        </View>
        <Text style={orderContent.orderName}>Obiad</Text>
        <Text style={orderContent.orderPrice}>{amount} x {cost.toFixed(2)} zł</Text>
        <Text style={orderContent.orderPrice}>{Number(cost * amount).toFixed(2)}zł</Text>
      </View>
      <View style={cartViewStyles.cartMealActionsBar}>
          <Pressable style={cartViewStyles.cartMealManageButton} onPress={() => mealEditHandler()} hitSlop={10}>
            <FontAwesomeIcon icon={faGear} color={cartViewStyles.cartMealManageButtonIcon.color} size={cartViewStyles.cartMealManageButtonIcon.width} />
          </Pressable>
          <View style={cartViewStyles.cartMealAmountOptions}>
            <Pressable style={{ ...cartViewStyles.cartMealAmountButton, borderColor: 'green' }} onPress={() => handleAmountUpdate(index, +1)} hitSlop={10}>
              <FontAwesomeIcon icon={faPlus} color={'green'} size={cartViewStyles.cartMealAmountButtonIcon.width} />
            </Pressable>
            <Pressable style={{ ...cartViewStyles.cartMealAmountButton, borderColor: '#871010' }} onPress={() => handleAmountUpdate(index, -1)} hitSlop={10}>
              <FontAwesomeIcon icon={faMinus} color={'#871010'} size={cartViewStyles.cartMealAmountButtonIcon.width} />
            </Pressable>
          </View>
      </View>
    </View>
  );
};

const CartSummary = ({ cartItems, setCartItems, cartPickupDate, handlePickupDateUpdate, handleCartClearingRequest, isExpanded, setIsExpanded, usePayment }: CartSummaryProps) => {

  const [cost, setCost] = useState<number | null>(summarizeCost(cartItems));
  const accessToken = useRecoilValue(userTokenSelector);
  const [ wallet, setWallet ] = useRecoilState(walletAtom)
  const [ balance, setBalance ] = useRecoilState(balanceAtom);
  const menu = useRecoilValue(menuSelector);

  useEffect(() => {
    setCost(summarizeCost(cartItems));
  }, [cartItems]);

  const FOLDED_HEIGHT = 40;
  const EXPANDED_HEIGHT = 225;

  const containerHeight = useSharedValue(EXPANDED_HEIGHT);
  const elementsHeight = useSharedValue(100);

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
    .then( () => usePayment( body, totalCost, cartPickupDate ) );

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
            <Text style={cartViewStyles.summaryInfoRowContent}>{Number(cost).toFixed(2)} zł</Text>
          </View>
          <View style={cartViewStyles.summaryInfoRow}>
            <Text style={cartViewStyles.summaryInfoRowLabel}>Data odbioru:</Text>
            <Text style={cartViewStyles.summaryInfoRowContent}>{cartPickupDate === null ? "brak" : parseDateToString(cartPickupDate)}</Text>
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

const CartPanel = ({ cartItems, handleAmountUpdate }: CartPanelProps) => {
  
  return (
    <>
    <Text style={orderViewStyles.title}>Zawartość koszyka</Text>
    <View style={cartViewStyles.cartPanel}>
      <FlashList
        contentContainerStyle={cartViewStyles.cartPanelList}
        data={cartItems}
        renderItem={({ item, index }: { item: CartItem; index: number }) => {
          return <CartItemView index={index} item={item} handleAmountUpdate={handleAmountUpdate} />;
        }}
        estimatedItemSize={150}
        keyExtractor={(_, index) => String(index)}
        ItemSeparatorComponent={CartPanelListItemSeparator}
        drawDistance={15}
      />
    </View>
    </>
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

const CartScreen = ({ navigation }) => {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState<boolean>(true);
  const [date, setDate] = useState<Date | null>(null);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cartOrder, setCartOrder] = useState<{ order: cartItem[]; pickupDate: Date } | null>(null);

  const updateItemAmount = (index: number, amountUpdate: number) => {
    const cartList = JSON.parse(JSON.stringify(cartItems));

    // modify value
    cartList[index].amount += amountUpdate;

    // check for deletion
    if (cartList[index].amount <= 0) {
      Alert.alert(
        "Item deletion",
        "Are you sure you want to remove this item from cart?",
        [
          {
            text: "Yes",
            onPress: () => {
              setCartItems(cartList.filter((item: CartItem) => item.amount > 0));
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

  return (
    <View style={cartViewStyles.root}>
      {cartItems?.length !== 0 ?       
      <>
        <CartPanel 
          cartItems={cartItems} 
          handleAmountUpdate={updateItemAmount} 
        />
        <CartSummary 
          cartItems={cartItems} 
          setCartItems={setCartItems} 
          cartPickupDate={date}

          handlePickupDateUpdate={() => showDatePicker(date, setDate, cartItems)} 
          handleCartClearingRequest={clearCart}

          isExpanded={isSummaryExpanded} 
          setIsExpanded={setIsSummaryExpanded}
		  usePayment={( orderBody: OrderBody, orderValue: number, pickupDate: Date ) => navigation.navigate("PaymentView", { orderBody, orderValue, pickupDate }) }
        /> 
      </>
      : <CartPanelBlank />
    }
    </View>
  );
};

export default CartScreen;
