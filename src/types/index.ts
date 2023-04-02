import { RegisteredStyle, TextStyle, ViewStyle } from "react-native/types";
import { AnimatableValue, AnimatedStyleProp } from "react-native-reanimated";
import { SetStateAction, Dispatch } from "react";
import { DailyMenu, DinnerItem } from "../api/menu/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {OrderBody, CreateOrdersBody} from "../api/orders/types";

export type RootStackParamList = {
  [key: string]: any;
  DinnerView: { dailyMenu: DailyMenu };
};

export interface HeaderProps {
  style: RegisteredStyle<ViewStyle>;
  titleStyle: RegisteredStyle<TextStyle>;
  title: string;
  stackNavigation: any;
}

export interface ExpandableProps {
  expanded: boolean;
  height: number;
  duration: number;
  style?: Object;
  afterAnimationCallback?: Function;
  children: any;
}

export interface OrderProps {
  id: string;
  title: string;
  isRedeemed: boolean;
}

export type OrderDetailsViewProps = NativeStackScreenProps<RootStackParamList, "OrderDetailsView">;

//Menu props
export interface MenuItemProps {
  dateSignature: string;
  dailyMenu: DailyMenu;

  containerHeight: number;
  switchHeight: number;
}

export interface MenuItemContainerProps {
  dailyMenu: DailyMenu;

  containerHeight: number;
  switchHeight: number;
  contentHeight: number;
  actionButtonHeight: number;
  isFolded: boolean;
}

export interface MenuBlankProps {
  containerStyle: ViewStyle;
  windowStyle: ViewStyle;
  iconStyle: TextStyle;
  headingStyle: TextStyle;
  textStyle: TextStyle;
}

export interface MenuVariantProps {
  dailyMenu: DailyMenu;
  selectedIndex: number;

  style?: AnimatedStyleProp<ViewStyle>;
  actionButtonStyle: AnimatedStyleProp<ViewStyle>;
  isFolded: boolean;
}

export interface SegmentedSwitchProps {
  segments: string[];
  onSegmentSwitch(selectedSegment: number): void;
  switchHeight: number | AnimatableValue;
  switchStyle?: ViewStyle | AnimatedStyleProp<ViewStyle>;
  segmentStyle?: ViewStyle;
  segmentTextStyle?: TextStyle;
  selectedSegmentStyle?: ViewStyle;
  isFolded: boolean;
}

// DinnerView
export interface DinnerData {
  id: number;
  section: string;
  data: DinnerItem[][];
}

export interface DinnerItemProps {
  item: DinnerItem;
  backgroundColor: string;
  onPress: () => void;
}

export type InnerIndex = number | null;

// [sectionId, index, innerIndex]
export type SelectedDinnerItem = [number, number, InnerIndex];

export type DinnerViewSelection = SelectedDinnerItem[];

export interface DinnerSelectProps {
  selectedIndex: InnerIndex;
  setSelectedIndex: (innerIndex: InnerIndex) => void;
  items: DinnerItem[];
}

export type DinnerViewProps = NativeStackScreenProps<RootStackParamList, "DinnerView">;

//CartView
export enum CartItemType {
  Dinner = "dinner",
  Item = "item",
}

export interface CartItemBase {
    type: CartItemType;
    cost: number;
    amount: number;
    data: object;
}

export interface CartItemDinnerObject {
  selection: DinnerViewSelection;
  weekday: number;
}

export interface CartItemDinner extends CartItemBase {
  type: CartItemType.Dinner;
  data: CartItemDinnerObject;
}

export interface CartItemItem extends CartItemBase {
  type: CartItemType.Item;
  data: object;
}

export type CartItem = CartItemDinner | CartItemItem;

export interface CartItemProps {
  index: number;
  item: CartItem;
  handleAmountUpdate: (index: number, amountUpdate: number) => void;
}

export interface CartPanelProps {
  cartItems: CartItem[]; 
  handleAmountUpdate: (index: number, amountUpdate: number) => void;
}

export interface CartSummaryProps {
  cartItems: CartItem[];
  setCartItems: any;
  cartPickupDate: Date | null;
  handlePickupDateUpdate: () => void;
  handleCartClearingRequest: () => void;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  usePayment: ( orderBody: CreateOrdersBody, orderValue: number, pickupDate: Date ) => void;
}

export type EmailConfirmationScreenProps = NativeStackScreenProps<RootStackParamList, "EmailConfirmationScreen">;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;
export type RegistrationScreenProps = NativeStackScreenProps<RootStackParamList, "RegistrationScreen">;

export interface UserDecodedData {
  sub: string;
  username: string;
  email: string;
  is_admin: boolean;
  exp: number;
}

export interface WalletFormViewProps {
		isDisplayed: boolean,
		setIsLoading: Dispatch<SetStateAction<boolean>>,
		unDisplay: () => void,
}

export interface WalletTopUpViewProps {
		isDisplayed: boolean,
		setIsLoading: Dispatch<SetStateAction<boolean>>,
		unDisplay: () => void,
		balanceDiff: number,
		isLoading: boolean,
}

export interface WalletCheckoutProps {
		isDisplayed: boolean,
		setIsLoading: Dispatch<SetStateAction<boolean>>,
		unDisplay: () => void,
		body: OrderBody,
		orderValue: number,
}
