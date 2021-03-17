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

  useEffect(() => {
    const unsubscribe = db
      .collection("requestRides")
      .doc(userId)
      .collection("userRide")
      .onSnapshot((snapshot) => {
        setRides(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setLoading(false);
        /*         snapshot.docs.map((doc) => console.log(doc.data()));
         */
      });

    return unsubscribe;
  }, []);
  console.log(rides);
  if (loading) return <LoadingSpinner />;
  else
    return (
      <SafeAreaView>
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
