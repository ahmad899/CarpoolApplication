import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import style from "../LoginScreen/style";
import styles from "./style.js";
import LoadingSpinner from "../../components/LoadingSpinner";
import { RadioButton } from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function RegistrationScreen({ navigation }) {
  const [name, setname] = useState("");
  const [SecondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState("Passenger");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };
  const onRegisterPress = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      setLoading(false);
      return;
    }
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
          phoneNumber: phoneNumber,
        });
      })
      .then((authUser) => {
        if (authUser) {
          db.collection("users").doc(authUser.uid).set({
            firstName: name,
            secondName: SecondName,
            email: email,
            userType: checked,
            userId: authUser.uid,
            phone: phoneNumber,
          });
        }
      })
      .catch((error) => {
         alert(error.message);
        setLoading(false);
      });

    await auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        if (!authUser.emailVerified) {
          authUser.sendEmailVerification();
        }
        db.collection("users")
          .doc(authUser.uid)
          .set({
            firstName: name,
            secondName: SecondName,
            email: email,
            userType: checked,
            userId: authUser.uid,
            phone: phoneNumber,
          })
          .then(() =>
            checked === "Driver"
              ? navigation.push("Driver", {
                  userId: authUser.uid,
                })
              : navigation.replace("ConfirmScreen")
          )
          .catch((error) => alert("Error"));
      }
    });
  };

  if (loading) return <LoadingSpinner />;
  else
    return (
      <KeyboardAvoidingView
        style={styles.container}
        style={{ flex: 1, width: "100%" }}
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/logIn.jpg")}
        />
        <ScrollView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setname(text)}
            value={name}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Second Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setSecondName(text)}
            value={SecondName}
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
            placeholder="Phone"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            keyboardType="number-pad"
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
          <View style={styles.radioButton}>
            <RadioButton
              value="Passenger"
              status={checked === "Passenger" ? "checked" : "unchecked"}
              onPress={() => setChecked("Passenger")}
              color="#ad462f"
            />
            <Text style={styles.radioText}>Passenger</Text>

            <RadioButton
              value="Driver"
              status={checked === "Driver" ? "checked" : "unchecked"}
              onPress={() => setChecked("Driver")}
              color="#ad462f"
            />
            <Text style={styles.radioText}>Driver</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}
          >
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
        </ScrollView>
      </KeyboardAvoidingView>
    );
}
