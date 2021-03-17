import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import ViewRideRow from "../../components/ViewRIdeRow/ViewRideRow";
import styles from "./styles";
import { SafeAreaView, ScrollView } from "react-native";
import LoadingSpinner from "../../components/LoadingSpinner";
const ViewRidesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [rides, setRides] = useState(null);
  const [passengerTextColor, setPassengerTextColor] = useState("white");
  const [passengerBackGroundColor, setPassengerBackGroundColor] = useState(
    "#ad462f"
  );
  const [driverTextColor, setDriverTextColor] = useState("black");
  const [driverBackGroundColor, setDriverBackGroundColor] = useState("white");
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("Passenger");
  const [passengerButton, setPassengerButton] = useState(true);
  const [DriverButton, setDriverButton] = useState(false);

  useEffect(() => {
    const unsubscribe = db
      .collection("rides")
      .where("userType", "==", `${userType}`)
      .onSnapshot((snapshot) => {
        setRides(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setLoading(false);
      });
    return unsubscribe;
  }, [userType]);

  const changePassengerColor = () => {
    setPassengerTextColor("white");
    setPassengerBackGroundColor("#ad462f");
    setDriverTextColor("black");
    setDriverBackGroundColor("white");
    setDriverButton(false);
    setPassengerButton(true);
    setLoading(true);
  };
  const changeDriverColor = () => {
    setDriverTextColor("white");
    setDriverBackGroundColor("#ad462f");
    setPassengerTextColor("black");
    setPassengerBackGroundColor("white");
    setPassengerButton(false);
    setDriverButton(true);
    setLoading(true);
  };

  const onPassengerButton = () => {
    changePassengerColor();
    setUserType("Passenger");
  };
  const onDriverButton = () => {
    changeDriverColor();
    setUserType("Driver");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TypeContainer}>
        <TouchableOpacity
          disabled={passengerButton}
          style={[
            styles.buttonContainer,
            { backgroundColor: passengerBackGroundColor },
          ]}
          onPress={onPassengerButton}
        >
          <Text style={[styles.buttonText, { color: passengerTextColor }]}>
            PASSENGER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={DriverButton}
          style={[
            styles.buttonContainer,
            { backgroundColor: driverBackGroundColor },
          ]}
          onPress={onDriverButton}
        >
          <Text style={[styles.buttonText, { color: driverTextColor }]}>
            DRIVER
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <LoadingSpinner color="white" />
      ) : (
        <ScrollView>
          <View style={styles.row}>
            {rides.map((data) => (
              <ViewRideRow data={data.data} key={data.id} id={data.id} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ViewRidesScreen;
