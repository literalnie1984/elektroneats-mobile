import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../views/colors";

const buttonStyle = StyleSheet.create({
  buttonContainer: {
    height: 55,
    width: "100%",
    backgroundColor: COLORS.colar,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { 
    color: COLORS.white, 
    fontWeight: "bold", 
    fontSize: 18 
  }
});

interface ButtonProps {
  title: string;
  onPress: () => any;
  style?: any;
}

const Button = ({ title, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ ...buttonStyle.buttonContainer, ...style }}
    >
      <Text style={buttonStyle.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
