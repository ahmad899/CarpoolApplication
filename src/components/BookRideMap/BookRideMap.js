import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { placesApi } from "../../../api/googleApi";
const BookRideMap = ({ origin, destination }) => {
  const originInfo = {
    latitude: origin.lat,
    longitude: origin.lng,
  };
  const destinationInfo = {
    latitude: destination.lat,
    longitude: destination.lng,
  };
 

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={false}
      initialRegion={{
        latitude: origin.lat,
        longitude: origin.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      minZoomLevel={3}
    >
      <MapViewDirections
        origin={originInfo}
        destination={destinationInfo}
        apikey={placesApi}
        strokeColor="#ad462f"
        strokeWidth={5}
      />

      <Marker coordinate={originInfo} title={"Origin"} />
      <Marker
        coordinate={destinationInfo}
        title={"Destination"}
        pinColor={"black"}
      />
    </MapView>
  );
};

export default BookRideMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
