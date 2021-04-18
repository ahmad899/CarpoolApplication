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
import MapViewDirections from "react-native-maps-directions";
import { placesApi } from "../../../api/googleApi";
import { colors } from "react-native-elements";
const initialState = null;

const EditMyRideMap = ({
  originPlace,
  destinationPlace,
  userOriginPlace,
  userDestinationPlace,
  setDistance,
  setDuration,
}) => {
  const [origin, setorigin] = useState({
    latitude: userOriginPlace.lat,
    longitude: userOriginPlace.lng,
  });
  const [destination, setdestination] = useState({
    latitude: userDestinationPlace.lat,
    longitude: userDestinationPlace.lng,
  });

  useEffect(() => {
    if (originPlace !== initialState && destinationPlace !== initialState) {
      setorigin({
        latitude: originPlace.details.geometry.location.lat,
        longitude: originPlace.details.geometry.location.lng,
      });
      setdestination({
        latitude: destinationPlace.details.geometry.location.lat,
        longitude: destinationPlace.details.geometry.location.lng,
      });
    }
  }, [originPlace, destinationPlace]);

  const route = useRoute();
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: userOriginPlace.lat,
        longitude: userOriginPlace.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={placesApi}
        strokeColor="#ad462f"
        strokeWidth={5}
        onReady={(result) => {
          setDistance(result.distance);
          setDuration(result.duration);
        }}
      />

      <Marker coordinate={origin} title={"Origin"} />
      <Marker
        coordinate={destination}
        title={"Destination"}
        pinColor={"black"}
      />
    </MapView>
  );
};

export default EditMyRideMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
