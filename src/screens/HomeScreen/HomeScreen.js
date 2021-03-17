import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Stylesheet,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import HomeScreenMap from "../../components/HomeScreenMap/HomeScreenMap";
import style from "../LoginScreen/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import HomeUserReq from "../../components/HomeUserReq/HomeUserReq";
const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const location = route.params.location;
  const user = route.params.user;
  const [rides, setRides] = useState([]);
  const [userReq, setUserReq] = useState(false);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = db
      .collectionGroup("userRide")
      .where("userId", "==", `${userId}`)
      .where("accept", "==", false)
      .onSnapshot((snapshot) => {
        setRides(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setUserReq(true);
      });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ad462f" />
      <HomeScreenMap />
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PostRide", { location, user });
            }}
          >
            <Text style={styles.text}>Post Ride</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ViewRides", { user });
            }}
          >
            <Text style={styles.text}>View Rides</Text>
          </TouchableOpacity>
        </View>
      </View>
      {userReq ? (
        <View style={styles.rideNotify}>
          {rides.map((data) => (
            <HomeUserReq data={data.data} key={data.id} id={data.id} />
          ))}
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    position: "absolute",
    top: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "40%",
    height: 50,
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#ad462f",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 15,
    margin: 10,
    color: "white",
    fontWeight: "bold",
  },
  rideNotify: {
    position: "absolute",
    top: 100,
    left: 20,
  },
});
