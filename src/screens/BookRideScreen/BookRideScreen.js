import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import BookRideMap from "../../components/BookRideMap/BookRideMap";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";

const BookRideScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const rideInfo = route.params.data.rideInfo;
  const userInfo = route.params.data.rideInfo.user;
  const currentUserType = route.params.currentUserType;
  const userName = route.params.userName;
  const fireBaseTime = new Date(
    rideInfo.date.seconds * 1000 + rideInfo.date.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  const time = fireBaseTime.toLocaleTimeString();
  const userId = auth.currentUser.uid;
  const [isBooked, setIsBooked] = useState(false);
  const [replace, setreplace] = useState();
  const rideId = route.params.data.rideId;

  useEffect(() => {
    db.collection("requestRides")
      .doc(userId)
      .collection("userRide")
      .doc(rideId)
      .get()
      .then((doc) => {
        if (doc.data().isBooked) {
          setIsBooked(doc.data().isBooked);
        } else setIsBooked(false);
      })
      .catch(() => setIsBooked(false));
  }, [replace]);

  console.log(isBooked);
  const onRequestRide = () => {
    if (!isBooked)
      db.collection("requestRides")
        .doc(userId)
        .collection("userRide")
        .doc(rideId)
        .set({
          rideInfo: rideInfo,
          isBooked: true,
          userId: rideInfo.user.userId,
          userRequestingId: userId,
          userRequestingName: userName,
          showHomeScreen: true,
          showNotification: true,
          accept: "pending",
          requestType: "booking",
        })
        .then((res) => {
          setreplace(true);
        })
        .catch((er) => alert(er));
    else alert("You Booked");
  };

  const onOfferRide = () => {
    if (!isBooked)
      db.collection("requestRides")
        .doc(userId)
        .collection("userRide")
        .doc(rideId)
        .set({
          rideInfo: rideInfo,
          userRequestingName: userName,
          userRequestingId: userId,
          isBooked: true,
          userId: rideInfo.user.userId,
          showHomeScreen: true,
          showNotification: true,
          accept: "pending",
          requestType: "offering",
        })
        .then((res) => {
          setreplace(true);
        })
        .catch((er) => alert(er));
    else alert("You Offered");
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <BookRideMap
          origin={rideInfo.originPlace}
          destination={rideInfo.destinationPlace}
        />
      </View>
      <View style={styles.subMainContainer}>
        <View style={styles.rideInfoContainer}>
          <View style={styles.topContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="user-circle" size={30} color="black" />
              <Text style={styles.text}>
                {userInfo.firstName} {userInfo.secondName}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={30}
                color="black"
              />
              <Text style={styles.text}>From: {rideInfo.originName}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={30}
                color="black"
              />
              <Text style={styles.text}>Distance: {rideInfo.distance} km</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Fontisto name="date" size={30} color="black" />
              <Text style={styles.text}>{date}</Text>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.bottomtext}>{userInfo.userType}</Text>
            <Text style={styles.bottomtext}>
              To: {rideInfo.destinationName}
            </Text>
            <Text style={styles.bottomtext}>
              Arrival Time: {Math.round(rideInfo.duration)} min
            </Text>
            <Text style={styles.bottomtext}>Time: {time}</Text>
          </View>
        </View>
        {userInfo.userId === userId ? (
          <View></View>
        ) : (
          <View style={styles.buttonContainer}>
            {userInfo.userType === "Driver" ? (
              <>
                <TouchableOpacity style={styles.subContainer}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>VIEW DRIVER INFO</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.subContainer}
                  onPress={onRequestRide}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>BOOK RIDE</Text>
                  </View>
                </TouchableOpacity>
                {currentUserType === "Driver" ? (
                  <TouchableOpacity
                    style={styles.subContainer}
                    onPress={onOfferRide}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>OFFER RIDE</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </>
            ) : userInfo.userType === "Passenger" ? (
              currentUserType === "Driver" ? (
                <TouchableOpacity
                  style={styles.subContainer}
                  onPress={onOfferRide}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>OFFER RIDE</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default BookRideScreen;
