import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Stylesheet,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Pressable,
} from "react-native";
import { Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import HomeScreenMap from "../../components/HomeScreenMap/HomeScreenMap";
import style from "../LoginScreen/style";
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ad462f" />
      <HomeScreenMap />
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PostRide");
            }}
          >
            <Text style={styles.text}>Post Ride</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PostRide");
            }}
          >
            <Text style={styles.text}>View Rides</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    position: "absolute",
    top: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "40%",
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#ad462f",

    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 15,
    margin: 10,
    color: "white",
    fontWeight: "bold",
  },
});
