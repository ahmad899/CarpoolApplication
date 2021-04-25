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
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //login process
  const onLoginPress = () => {
    auth.signOut();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser.user.emailVerified) {
          setLoading(false);
          navigation.replace("Home");
        } else {
          setLoading(false);
          alert("Go to your email to verify");
        }
      })
      .catch((error) => {
        alert("credential error");
        setLoading(false);
      });
  };

  const onFooterLinkPress = () => {
    navigation.navigate("SignUp");
  };

  const onResetPass = () => {
    navigation.navigate("ResetPass");
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}
          >
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
            <Text style={styles.footerText}>
              Forget password?{""}
              <Text onPress={onResetPass} style={styles.footerLink}>
                Reset
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
}
