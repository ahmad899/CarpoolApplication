import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { Input } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const HomeScreenMap = (props) => {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default HomeScreenMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
