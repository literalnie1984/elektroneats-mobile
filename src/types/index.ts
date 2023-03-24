import { RegisteredStyle, TextStyle, ViewStyle } from "react-native/types";

interface HeaderProps {
    style: RegisteredStyle<ViewStyle>, 
    titleStyle: RegisteredStyle<TextStyle>,
    title: string,
    stackNavigation: any,
}

export {
    HeaderProps
}