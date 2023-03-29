import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <View>
        <TextInput />
      </View>
      <View>
        <TextInput />
      </View>
      <TouchableOpacity>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginView;
