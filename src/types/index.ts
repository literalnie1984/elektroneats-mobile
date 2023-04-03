import { RegisteredStyle, TextStyle, ViewStyle } from "react-native/types";
import { AnimatableValue, AnimatedStyleProp } from "react-native-reanimated";
import { SetStateAction, Dispatch } from "react";
import { DailyMenu, DinnerItem } from "../api/menu/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderBody, CreateOrdersBody, OrderDinner } from "../api/orders/types";
import { PickerItem } from "./OptionComponentsTypes";

export type RootStackParamList = {
  [key: string]: any;
  DinnerView: DinnerViewRoute;
  OrderDetailsView: OrderProps;
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
  collectionDate: string;
  username: string;
  status: string;
  data: OrderDinner[];
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
  isSelectable: boolean;
}

export enum DinnerViewDisplayMode {
  CREATE = 1, // when creating new order for the cart
  EDIT = 2, // after clicking the gear in the cart
  INFO = 3  // after clicking on the item in order details
}

interface DinnerViewBase {
  mode: DinnerViewDisplayMode;
  data: object;
}

interface DinnerViewCreate extends DinnerViewBase {
  mode: DinnerViewDisplayMode.CREATE;
  data: DailyMenu;
}

interface DinnerViewEdit extends DinnerViewBase {
  mode: DinnerViewDisplayMode.EDIT;
  data: CartItemDinner;
}

interface DinnerViewInfo extends DinnerViewBase {
  mode: DinnerViewDisplayMode.INFO;
  data: never;
}

export type DinnerViewRoute = (DinnerViewCreate | DinnerViewEdit | DinnerViewInfo);

export type DinnerViewProps = NativeStackScreenProps<RootStackParamList, "DinnerView">;

//CartView
export enum CartItemType {
  Dinner = "dinner",
  Item = "item",
}

export interface CartItemBase {
  id: string;
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
  navigation: any;
}

export interface CartPanelProps {
  cartItems: CartItem[];
  handleAmountUpdate: (index: number, amountUpdate: number) => void;
  navigation: any;
}

export interface CartSummaryProps {
  cartItems: CartItem[];
  setCartItems: any;
  cartPickupDate: Date | null;
  handlePickupDateUpdate: () => void;
  handleCartClearingRequest: () => void;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  usePayment: Function;
}

export type EmailConfirmationScreenProps = NativeStackScreenProps<RootStackParamList, "EmailConfirmationScreen">;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;
export type RegistrationScreenProps = NativeStackScreenProps<RootStackParamList, "RegistrationScreen">;

export interface UserDecodedData {
  sub: string;
  username: string;
  email: string;
  is_admin: boolean;
  is_verified: boolean;
  exp: number;
}

export interface WalletFormViewProps {
  isDisplayed: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  unDisplay: () => void;
}

export interface WalletTopUpViewProps {
  isDisplayed: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  unDisplay: () => void;
  balanceDiff: number;
  isLoading: boolean;
}

export interface WalletCheckoutProps {
  isDisplayed: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  unDisplay: () => void;
  body: OrderBody;
  orderValue: number;
}

export enum SettingType {
		Switch = 'switch',
		Slider = 'slider',
		InputText = 'input-text',
		InputNum = 'input-num',
		Dropdown = 'dropdown',
		CheckboxList = 'checkbox-list',
};

export interface SettingSwitchProps {
		tagTrue: string,
		tagFalse: string,
};

export interface SettingInputNumProps {
		maxVal: number,
		minVal: number,
};

export interface SettingSliderProps extends SettingInputNumProps {
		step: number,
};

export interface SettingInputTextProps {
		maxLength: number,
};

export interface SettingDropdownProps {
		optionsList: PickerItem[],
		mode: "dialog" | "dropdown"
};

export interface SettingCheckboxListProps {
		defValue: boolean[],
		tags: string[]
};

export interface Setting {
		name: string,
		tag: string,
		section: string,
		menu: string,
		disabled: boolean,
		type: SettingType,
		value: any | any[],
		props: SettingSwitchProps | SettingSliderProps | SettingDropdownProps | SettingInputNumProps | SettingInputTextProps | SettingCheckboxListProps,
};

export type Settings = Setting[];

export interface OptionNumberInputProps {
		name: string,
		tag: string,
		value: number,
		handleValueChange?: ( value: number ) => any,
		maxVal: number,
		minVal: number,
		disabled: boolean,
};

export interface OptionTextInputProps {
		name: string,
		tag: string,
		value: string,
		handleValueChange?: ( value: string ) => any,
		maxLen: number,
		disabled: boolean,
};

export interface OptionSwitchProps {
		label: string,
		tag: string,
		tagTrue: string,
		tagFalse: string,
		state: boolean,
		disabled: boolean,
		handleSwitch?: ( value: boolean ) => any,
};

export interface SettingHandlerBind {
		tag: string,
		handler: ( value: any ) => any,
}
