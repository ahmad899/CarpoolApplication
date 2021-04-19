import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Keyboard } from "react-native";
import { Image } from "react-native";
import {
  Text,
  View,
  TextInput,
  RadioButton,
  TouchableOpacity,
} from "react-native";
import { db } from "../../../firebaseConfig/firebaseConfig";
import styles from "./styles";
import LoadingSpinner from "../../components/LoadingSpinner";

const DriverInfoScreen = ({ navigation, route }) => {
  const [driverLicense, setDriverLicense] = useState("");
  const [userIdentificationNum, setUserIdentificationNum] = useState("");
  const [carType, setCarType] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPlateNumber, setCarPlateNumber] = useState("");

  
  const AddDriverInfo = () => {
    if (!driverLicense.trim()) {
      alert("Enter Driver License");
      return;
    }
    if (!userIdentificationNum.trim()) {
      alert("User Identification Number");
      return;
    }
    if (!carType.trim()) {
      alert("Car Type");
      return;
    }
    if (!carModel.trim()) {
      alert("Car Model");
      return;
    }
    if (!carPlateNumber.trim()) {
      alert("carPlateNumber");
      return;
    }

    db.collection("users")
      .doc(route.params.userId)
      .update({
        driverInfo: {
          driverLicense,
          userIdentificationNum,
          carType,
          carModel,
          carPlateNumber,
        },
      })
      .then( 
        navigation.replace("ConfirmScreen")
      )
      .catch((err) => {
        alert("falied");
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      style={{ flex: 1, width: "100%" }}
    >
      <Image
        style={styles.logo}
        source={require("../../../assets/logIn.jpg")}
      />

      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Driver license"
          keyboardType="numeric"
          value={driverLicense}
          onChangeText={(text) => setDriverLicense(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="User ID"
          keyboardType="numeric"
          value={userIdentificationNum}
          onChangeText={(text) => setUserIdentificationNum(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Car Type"
          placeholderTextColor="#aaaaaa"
          value={carType}
          onChangeText={(text) => setCarType(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Car Model"
          keyboardType="numeric"
          value={carModel}
          onChangeText={(text) => setCarModel(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Car Plate Number"
          keyboardType="numeric"
          value={carPlateNumber}
          onChangeText={(text) => setCarPlateNumber(text)}
        />

        <TouchableOpacity style={styles.button} onPress={() => AddDriverInfo()}>
          <Text style={styles.buttonTitle}>Add Driver Info</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DriverInfoScreen;
