import React from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import BookRideMap from "../../components/BookRideMap/BookRideMap";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const BookRideScreen = () => {
  const route = useRoute();
  const rideInfo = route.params.data.rideInfo;
  const userInfo = route.params.data.rideInfo.user;
  const fireBaseTime = new Date(
    rideInfo.date.seconds * 1000 + rideInfo.date.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  const time = fireBaseTime.toLocaleTimeString();

  console.log(rideInfo);
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <BookRideMap
          origin={rideInfo.originPlace}
          destination={rideInfo.destinationPlace}
        />
      </View>
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
          <Text style={styles.bottomtext}>To: {rideInfo.destinationName}</Text>
          <Text style={styles.bottomtext}>
            Arrival Time: {Math.round(rideInfo.duration)} min
          </Text>
          <Text style={styles.bottomtext}>Time: {time}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {userInfo.userType === "Driver" ? (
          <TouchableOpacity style={styles.subContainer}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>VIEW DRIVER INFO</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <TouchableOpacity style={styles.subContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>OFFER RIDE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookRideScreen;
