import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Stylesheet,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Input } from "react-native-elements";
import Animated from "react-native-reanimated";
import HomeScreenMap from "../../components/HomeScreenMap/HomeScreenMap";
import style from "../LoginScreen/style";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Where To ?</Text>
      </View>
      <HomeScreenMap />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {},
  text: {
    position: "absolute",
    left: 0,
    bottom: 0,
    fontSize: 90,
  },
});
