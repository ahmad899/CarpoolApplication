import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../../../firebaseConfig/firebaseConfig";
import LoadingSpinner from "../../components/LoadingSpinner";
import UserRow from "../../components/UserRow/UserRow";
import styles from "./styles";
const ViewProfileScreen = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setLoading(false);
    });
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingSpinner color="red" />
      ) : (
        <ScrollView>
          <View style={styles.row}>
            {users.map(({ id, data }) => (
              <UserRow key={id} id={id} data={data} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ViewProfileScreen;
