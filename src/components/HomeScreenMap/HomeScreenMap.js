import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
const HomeScreenMap = (props) => {
  const route = useRoute();
  const latitude = route.params.location.coords.latitude || 30;
  const longitude = route.params.location.coords.longitude || 30;

  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      showsMyLocationButton={true}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.001,
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
