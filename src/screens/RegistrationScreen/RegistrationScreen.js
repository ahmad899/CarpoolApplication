import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import style from "../LoginScreen/style";
import styles from "./style.js";
import LoadingSpinner from "../../components/loadingSpinner";
import { RadioButton } from "react-native-paper";

export default function RegistrationScreen({ navigation }) {
  const [name, setname] = useState("");
  const [SecondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState("Passenger");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    setLoading(true);
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      setLoading(false);
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
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        db.collection("users")
          .add({
            firstName: name,
            secondName: SecondName,
            email: email,
            password: password,
            userType: checked,
          })
          .then(navigation.replace("Home"))
          .catch((error) => alert("Error"));
      }
    });
  };

  if (loading) return <LoadingSpinner />;
  else
    return (
      <View style={styles.container} style={{ flex: 1, width: "100%" }}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logIn.jpg")}
        />

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
      </View>
    );
}
