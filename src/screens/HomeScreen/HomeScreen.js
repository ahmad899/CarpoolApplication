import React from "react";
import { View, Text, Stylesheet, TouchableOpacity } from "react-native";
import { auth } from "../../../firebaseConfig/firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>signUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
