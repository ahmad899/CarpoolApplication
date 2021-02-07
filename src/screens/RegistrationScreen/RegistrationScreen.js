import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import style from "../LoginScreen/style";
import styles from "./style.js";

export default function RegistrationScreen({ navigation }) {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container} style={{ flex: 1, width: "100%" }}>
      <Image
        style={styles.logo}
        source={require("../../../assets/logIn.jpg")}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setname(text)}
        value={name}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
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
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
        <Text style={styles.buttonTitle}>Create account</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Already got an account?{" "}
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}
