import { RegisteredStyle, TextStyle, ViewStyle } from "react-native/types";
import { AnimatableValue, AnimatedStyleProp } from "react-native-reanimated";

interface HeaderProps {
  style: RegisteredStyle<ViewStyle>;
  titleStyle: RegisteredStyle<TextStyle>;
  title: string;
  stackNavigation: any;
}

interface ExpandableProps {
  expanded: boolean;
  height: number;
  duration: number;
  style?: Object;
  afterAnimationCallback?: Function;
  children: any;
}

interface OrderProps {
  id: string;
  title: string;
  isRedeemed: boolean;
}

//Menu props
interface MealContent {
  id: number;
  image: string;
  max_supply: number;
  name: string;
  price: string;
  type: "Main" | "Soup";
  week_day: number;
}

interface ExtrasContent {
  id: number;
  name: string;
  price: number;
}

type Main = MealContent[];
type Soup = MealContent[];
type Extras = Array<Array<ExtrasContent>>;
type Beverage = Array<Array<ExtrasContent>> | [][];

interface MenuContent {
  main: Main;
  soup: Soup;
  extras: Extras;
  beverage: Beverage;
}

interface MenuItem {
  dateSignature: string;
  menuContent: MenuContent;
}

type MenuList = MenuItem[];

interface SegmentedSwitchProps {
  segments: string[];
  onSegmentSwitch(selectedSegment: number): void;
  switchHeight: number | AnimatableValue;
  switchStyle?: ViewStyle | AnimatedStyleProp<ViewStyle>;
  segmentStyle?: ViewStyle;
  segmentTextStyle?: TextStyle;
  selectedSegmentStyle?: ViewStyle;
  isFolded: boolean;
}

interface MenuBlankProps {
  containerStyle: ViewStyle;
  windowStyle: ViewStyle;
  iconStyle: TextStyle;
  headingStyle: TextStyle;
  textStyle: TextStyle;
}

interface MenuVariantProps {
  menu: MenuContent;
  style?: AnimatedStyleProp<ViewStyle>;
  actionButtonStyle: AnimatedStyleProp<ViewStyle>;
  isFolded: boolean;
  main: MealContent;
  soup: MealContent;
  extras: Extras;
  beverage: Beverage;
}

interface MenuItemContainerProps {
  containerHeight: number;
  switchHeight: number;
  contentHeight: number;
  actionButtonHeight: number;
  isFolded: boolean;
  menuContent: MenuContent;
}

interface MenuItemProps {
  dateSignature: string;
  menuContent: MenuContent;
  containerHeight: number;
  switchHeight: number;
}

// DinnerView
interface DinnerItem {
  name: string;
  uri: string;
}

interface DinnerData {
  section: string;
  data: DinnerItem[][];
}

interface DinnerItemProps {
  name: string;
  uri: string;
  backgroundColor: string;
  onPress: () => void;
}

type InnerIndex = number | null;

interface SelectedDinnerItem {
  section: string;
  index: number;
  innerIndex: InnerIndex;
}

interface DinnerSelectProps {
  selectedIndex: InnerIndex;
  setSelectedIndex: (innerIndex: InnerIndex) => void;
  items: DinnerItem[];
}

export {
  HeaderProps,
  SegmentedSwitchProps,
  ExpandableProps,
  OrderProps,
  MenuItemContainerProps,
  MenuItemProps,
  MenuBlankProps,
  MenuVariantProps,
  Extras,
  Beverage,
  MenuContent,
  MenuItem,
  MenuList,
  DinnerData,
  DinnerItemProps,
  InnerIndex,
  SelectedDinnerItem,
  DinnerSelectProps,
};
