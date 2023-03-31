import { RegisteredStyle, TextStyle, ViewStyle } from "react-native/types";
import { AnimatableValue, AnimatedStyleProp } from "react-native-reanimated";
import { SetStateAction, Dispatch } from "react";
import { DailyMenu, DinnerItem } from "../api/menu/types";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  [key: string]: any;
  DinnerView: { dailyMenu: DailyMenu };
}

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
  section: string;
  data: DinnerItem[][];
}

export interface DinnerItemProps {
  item: DinnerItem;
  backgroundColor: string;
  onPress: () => void;
}

export type InnerIndex = number | null;

export interface SelectedDinnerItem {
  section: string;
  index: number;
  innerIndex: InnerIndex;
}

export interface DinnerSelectProps {
  selectedIndex: InnerIndex;
  setSelectedIndex: (innerIndex: InnerIndex) => void;
  items: DinnerItem[];
}

export type DinnerViewProps = NativeStackScreenProps<RootStackParamList, 'DinnerView'>;


//CartView
export interface CartItemObject {
  type: "meal" | "item";
  cost: number;
  amount: number;
  data: object;
}

export interface CartItemProps extends CartItemObject {
  index: number;
  handleAmountUpdate: (index: number, amountUpdate: number) => void;
}

export interface CartSummaryProps {
  cartItems: CartItemObject[];
  cartPickupDate: Date | null;
  handlePickupDateUpdate: () => void;
  handleCartClearingRequest: () => void;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export interface CartPanelProps {
  isSummaryExpanded: boolean;
  data: CartItemObject[];
}
