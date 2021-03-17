import { id } from "date-fns/locale";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import styles from "./styles";
const HomeUserReq = ({ data, id }) => {
  const userId = auth.currentUser.uid;

  const onPressNotificaiton = () => {
    db.collection("requestRides")
      .doc(data.userRequestingId)
      .collection("userRide")
      .doc(id)
      .update({
        isBooked: false,
        accept: true,
      });
  };

  console.log(data);

  if (data.requestType === "booking")
    return (
      <TouchableOpacity style={styles.container} onPress={onPressNotificaiton}>
        <Text style={styles.text}>
          {data.userRequestingName} Want's To Ride With You
        </Text>
      </TouchableOpacity>
    );
  else if (data.requestType === "offering")
    return (
      <TouchableOpacity style={styles.container} onPress={onPressNotificaiton}>
        <Text style={styles.text}>
          {data.userRequestingName} Offering Ride To You
        </Text>
      </TouchableOpacity>
    );
  else return <View></View>;
};

export default HomeUserReq;
