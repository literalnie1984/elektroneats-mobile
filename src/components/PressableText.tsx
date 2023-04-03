import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const PressableText = ({ title, leftText, onPress = () => {}, style, fontSize }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize }}>{leftText}</Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ paddingHorizontal: 4, paddingVertical: 2 }}>
        <Text style={{ ...style, fontSize }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PressableText;
