import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../views/colors";

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.whiteColar,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

interface InputProps {
  label: string;
  style?: any;
  iconName: string;
  errorMsg: string | null;
  password?: boolean;
  onFocus: () => any;
  [key: string]: any;
}

const Input = ({ label, iconName, errorMsg, password, onFocus, style, ...props }: InputProps) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: errorMsg ? COLORS.red : isFocused ? COLORS.darkColar : COLORS.whiteColar,
            alignItems: "center",
          },
        ]}
      >
        <Icon name={iconName} style={{ color: COLORS.darkColar, fontSize: 22, marginRight: 10 }} />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: COLORS.black, flex: 1, ...style }}
          {...props}
        />
        {password && <Icon onPress={() => setHidePassword(!hidePassword)} name={hidePassword ? "eye-outline" : "eye-off-outline"} style={{ color: COLORS.darkColar, fontSize: 22 }} />}
      </View>
      {errorMsg && <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>{errorMsg}</Text>}
    </View>
  );
};

export default Input;
