import React, { useState } from "react";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const ConfirmScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Go to your email account to verify your identity
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.buttonTitle}>Go to LogIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: {
    backgroundColor: "#ad462f",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
  },
  buttonTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
