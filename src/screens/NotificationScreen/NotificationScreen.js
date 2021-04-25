import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import NotificationRow from "../../components/NotificationRow/NotificationRow";
import styles from "./styles";
const NotificationScreen = () => {
  const userId = auth.currentUser.uid;
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collectionGroup("userRide")
      .where("userId", "==", `${userId}`)
      .where("showNotification", "==", true)
      .onSnapshot((snapshot) => {
        setRides(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return unsubscribe;
  }, []);
 
  return rides.length === 0 ? (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 20 }}>No Notification</Text>
    </View>
  ) : (
    <View>
      {rides.map((data) => (
        <NotificationRow data={data.data} key={data.id} id={data.id} />
      ))}
    </View>
  );
};

export default NotificationScreen;
