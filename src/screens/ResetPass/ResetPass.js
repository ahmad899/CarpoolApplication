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
  ScrollView,
} from "react-native";
import styles from "./style";
import { auth } from "../../../firebaseConfig/firebaseConfig";
import LoadingSpinner from "../../components/LoadingSpinner";
export default function ResetPass({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //login process

  const onSendEmail = () => {
    setLoading(true);
    setEmail("");
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Check your account to reset the password");
        setLoading(false);
      })
      .catch((error) => {
        alert("error");
        setLoading(false);
      });
  };

  if (loading) return <LoadingSpinner />;
  else
    return (
      <KeyboardAvoidingView
        style={styles.container}
        style={{ flex: 1, width: "100%" }}
      >
        <StatusBar />
        <Image
          style={styles.logo}
          source={require("../../../assets/logIn.jpg")}
        />
        <ScrollView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={() => onSendEmail()}>
            <Text style={styles.buttonTitle}>Send Email</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}
