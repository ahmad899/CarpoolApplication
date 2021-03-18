import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import { db } from "../../../firebaseConfig/firebaseConfig";

const NotificationRow = ({ data, id }) => {
  const onAccept = () => {
    db.collection("requestRides")
      .doc(data.userRequestingId)
      .collection("userRide")
      .doc(id)
      .update({
        accept: true,
        showNotification: false,
        isBooked: true,
      })
      .then();
  };

  const onDecline = () => {
    db.collection("requestRides")
      .doc(data.userRequestingId)
      .collection("userRide")
      .doc(id)
      .update({
        accept: false,
        showNotification: false,
        isBooked: false,
      })
      .then();
  };
  return (
    <View style={styles.container}>
      <View style={styles.fromToInfo}>
        <Text style={styles.fromToText}>From: {data.rideInfo.originName}</Text>
        <Text style={styles.fromToText}>
          To: {data.rideInfo.destinationName}
        </Text>
      </View>

      <View style={styles.userRequest}>
        {data.requestType === "booking" ? (
          <Text style={styles.userRequestText}>
            {data.userRequestingName}: Wants to Ride With You
          </Text>
        ) : data.requestType === "offering" ? (
          <Text style={styles.userRequestText}>
            {data.rideInfo.user.userType}: {data.userRequestingName} Offering
            You a Ride
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onAccept}>
          <View style={styles.buttonChild}>
            <Entypo name="check" size={30} color="green" />
            <Text style={styles.buttonText}>Accept</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.lineBetween} />
        <TouchableOpacity onPress={onDecline}>
          <View style={styles.buttonChild}>
            <Entypo name="cross" size={30} color="red" />
            <Text style={styles.buttonText}>Decline</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationRow;
