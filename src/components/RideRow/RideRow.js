import { format } from "date-fns";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const RideRow = ({ id, data }) => {
  const fireBaseTime = new Date(
    data.date.seconds * 1000 + data.date.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  const time = fireBaseTime.toLocaleTimeString();

  return (
    <TouchableOpacity key={id} style={styles.row}>
      <View style={styles.fromToLocation}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}> From: {data.originName}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            Distance:{Math.round(data.distance)} km
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Fontisto name="date" size={24} color="black" />
          <Text style={styles.text}> {date}</Text>
        </View>
      </View>
      <View style={styles.rideTimeInfo}>
        <Text style={styles.text}>To: {data.destinationName}</Text>
        <Text style={styles.text}>Time: {Math.round(data.duration)} min</Text>
        <Text style={styles.text}>Clock: {time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RideRow;
