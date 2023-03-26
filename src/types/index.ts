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

interface MenuVariant {
  soup: string;
  mainCourse: string;
  sideDish: string;
  beverage: string;
}

interface MenuVariantProps {
  menu: MenuVariant;
  style?: AnimatedStyleProp<ViewStyle>;
  actionButtonStyle: AnimatedStyleProp<ViewStyle>;
  isFolded: boolean;
}

interface MenuItemContainerProps {
  containerHeight: number;
  switchHeight: number;
  contentHeight: number;
  actionButtonHeight: number;
  isFolded: boolean;
  menuVariants: MenuVariant[];
}

interface MenuItemProps {
  dateSignature: string;
  menuVariants: MenuVariant[];
  containerHeight: number;
  switchHeight: number;
}

type Menu = { dateSignature: string; menuVariants: MenuVariant[] }[];

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

export { HeaderProps, SegmentedSwitchProps, ExpandableProps, OrderProps, MenuItemContainerProps, MenuItemProps, MenuBlankProps, MenuVariantProps, Menu, DinnerData, DinnerItemProps, InnerIndex, SelectedDinnerItem, DinnerSelectProps };
