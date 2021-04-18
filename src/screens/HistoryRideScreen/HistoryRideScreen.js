import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import LoadingSpinner from "../../components/LoadingSpinner";
import ViewRideRow from "../../components/ViewRIdeRow/ViewRideRow";
import styles from "./styles";
const HistoryRideScreen = () => {
  const userId = auth.currentUser.uid;
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(userId);
  const ride = db.collection("requestRides").doc(userId).collection("userRide");

  const getUserRide = async () => {
    const recivingId = ride.where("userId", "==", userId).get();
    const sendingId = ride.where("userRequestingId", "==", userId).get();
    const [recQueryId, sendQueryId] = await Promise.all([
      recivingId,
      sendingId,
    ]);
    const recId = recQueryId.docs;
    const sendId = sendQueryId.docs;
    const rideArr = recId.concat(sendId);
    return rideArr;
  };

  useEffect(() => {
    const unsubscribe = async () =>
      await getUserRide().then((result) => {
        setRides(
          result.map((snapshot) => ({
            id: snapshot.id,
            data: snapshot.data(),
          }))
        );
        setLoading(false);
      });
    unsubscribe();
    return unsubscribe;
  }, []);
  if (loading) return <LoadingSpinner color="red" />;
  else
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.row}>
            {rides.map((data) => (
              <ViewRideRow data={data.data} key={data.id} id={data.id} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};

export default HistoryRideScreen;
