import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import styles from "./style";
import { ActivityIndicator } from "react-native";
import { auth } from "../../../firebaseConfig/firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle if the user is logged in before or not
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
      console.log(authUser);
    });
    return unsubscribe;
  }, []);

  //login process
  const onLoginPress = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert("credential error"));
  };

  const onFooterLinkPress = () => {
    navigation.navigate("SignUp");
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      style={{ flex: 1, width: "100%" }}
    >
      <StatusBar style="light" />
      <Image
        style={styles.logo}
        source={require("../../../assets/logIn.jpg")}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
        <Text style={styles.buttonTitle}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Sign up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
