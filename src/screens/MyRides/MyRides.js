import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth } from "../../../firebaseConfig/firebaseConfig";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import RideRow from "../../components/RideRow/RideRow";
import { Pressable } from "react-native";
const MyRides = () => {
  const route = useRoute();
  const [rides, setRides] = useState([]);
  const user = auth.currentUser;
  useEffect(() => {
    const unsubscribe = db
      .collection("rides")
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) =>
        setRides(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data().rideInfo,
          }))
        )
      );

    return unsubscribe;
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          {rides.map(({ id, data }) => (
            <RideRow key={id} id={id} data={data} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyRides;
