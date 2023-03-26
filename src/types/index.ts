import { RegisteredStyle, TextStyle, ViewStyle } from "react-native/types";
import Animated, {AnimatableValue, AnimatedStyleProp} from "react-native-reanimated";
import {AnimatedStyle} from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";

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
		segments: string[],
		onSegmentSwitch(selectedSegment : number): void,
		switchHeight: number | AnimatableValue,
		switchStyle?: ViewStyle | AnimatedStyleProp<ViewStyle>,
		segmentStyle?: ViewStyle,
		segmentTextStyle?: TextStyle,
		selectedSegmentStyle?: ViewStyle,
		isFolded: boolean,
};

interface MenuBlankProps {
		containerStyle: ViewStyle,
		windowStyle: ViewStyle,
		iconStyle: TextStyle,
		headingStyle: TextStyle,
		textStyle: TextStyle,
};

interface MenuVariant{
		style: ViewStyle,
		soup: string,
		mainCourse: string,
		sideDish: string,
		beverage: string,
};

interface MenuVariantProps {
		menu: MenuVariant,
		style?: AnimatedStyleProp<ViewStyle>,
		isFolded: boolean,
};

interface MenuItemContainerProps {
		containerHeight: AnimatableValue,
		switchHeight: AnimatableValue,
		contentHeight: AnimatableValue,
		isFolded: boolean,
		menuVariants: MenuVariant[],
};

interface MenuItemProps {
		dateSignature: string,
		menuVariants: MenuVariant[],
		containerHeight: number,
		switchHeight: number,
};

export { HeaderProps, SegmentedSwitchProps, ExpandableProps, OrderProps, MenuItemContainerProps, MenuItemProps, MenuBlankProps, MenuVariantProps };
