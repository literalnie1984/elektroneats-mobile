import { RegisteredStyle, TextStyle, ViewStyle } from "react-native/types";

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

export { HeaderProps, ExpandableProps, OrderProps };
