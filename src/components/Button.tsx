import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "../views/colors";

const Button = ({ title, onPress = () => {}, style }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: "#f78154ff",
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
