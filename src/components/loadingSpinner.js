import React from "react";

import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "react-native";

const loadingSpinner = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#ad462f" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default loadingSpinner;
