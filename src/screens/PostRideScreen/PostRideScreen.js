import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import PostRideMap from "../../components/PostRideMap/PostRideMap";
import styles from "./styles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MaterialIcons } from "@expo/vector-icons";
import { placesApi } from "../../../api/googleApi";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { compareAsc, format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native";
import PlaceRow from "./PlaceRow";
import { KeyboardAvoidingView } from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import { useNavigation, useRoute } from "@react-navigation/native";
const initialState = null;

const PostRideScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [userDB, setUserDB] = useState(initialState);
  const [originPlace, setOriginPlace] = useState(initialState);
  const [destinationPlace, setdestinationPlace] = useState(initialState);
  const [showDateVlaue, setshowDateVlaue] = useState(false);
  const [showTimeVlaue, setshowTimeVlaue] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const onPostRide = async () => {
    const user = auth.currentUser;
    await db
      .collection("rides")
      .add({
        rideInfo: {
          originPlace: originPlace.details.geometry.location,
          destinationPlace: destinationPlace.details.geometry.location,
          originName: originPlace.details.name,
          destinationName: destinationPlace.details.name,
          date: date,
          distance: distance,
          duration: duration,
          user: route.params.user,
        },
        userType: route.params.user.userType,
        userId: user.uid,
      })
      .then(() => navigation.navigate("MyRide"))
      .catch((er) => console.warn("error"));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setshowDateVlaue(true);
  };

  const showTimepicker = () => {
    showMode("time");
    setshowTimeVlaue(true);
  };

  const onDistnace = (val) => setDistance(val);
  const onDuration = (val) => setDuration(val);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <PostRideMap
          originPlace={originPlace}
          destinationPlace={destinationPlace}
          setDistance={onDistnace}
          setDuration={onDuration}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.rowContainer}>
            <MaterialIcons name="add-location" size={30} color="black" />
            <GooglePlacesAutocomplete
              placeholder="Where From?"
              currentLocation={true}
              currentLocationLabel="Current Location"
              onPress={(data, details = null) => {
                setOriginPlace({ data, details });
              }}
              suppressDefaultStyles
              renderRow={(data) => <PlaceRow data={data} />}
              renderDescription={(data) => data.description || data.vicinity}
              styles={{
                textInput: styles.textInput,
                container: styles.autoCompleteContainer,
              }}
              fetchDetails
              query={{
                key: placesApi,
                language: "en",
              }}
              onFail={(error) => console.error(error)}
            />
          </View>
          <View style={styles.rowContainer}>
            <MaterialIcons name="add-location" size={30} color="black" />
            <GooglePlacesAutocomplete
              placeholder="Where to?"
              onPress={(data, details = null) => {
                setdestinationPlace({ data, details });
              }}
              styles={{
                textInput: styles.textInput,
                container: styles.autoCompleteContainer,
              }}
              suppressDefaultStyles
              renderRow={(data) => <PlaceRow data={data} />}
              renderDescription={(data) => data.description || data.vicinity}
              fetchDetails
              query={{
                key: placesApi,
                language: "en",
              }}
              onFail={(error) => console.error(error)}
            />
          </View>
          <View style={styles.rowContainer}>
            <Fontisto name="date" size={30} color="black" />
            <Pressable style={styles.textInput} onPress={showDatepicker}>
              <TextInput
                style={{ fontSize: 15, fontWeight: "bold" }}
                placeholder={
                  showDateVlaue
                    ? format(date, "MMMM do, yyyy ")
                    : "Press To Select Date"
                }
                editable={false}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                />
              )}
            </Pressable>
          </View>
          <View style={styles.rowContainer}>
            <Feather name="clock" size={30} color="black" />
            <Pressable style={styles.textInput} onPress={showTimepicker}>
              <TextInput
                style={{ fontSize: 15, fontWeight: "bold" }}
                placeholder={
                  showTimeVlaue
                    ? format(date, "H:mm a")
                    : "Press to Select Time"
                }
                editable={false}
              />
            </Pressable>
          </View>
          <TouchableOpacity
            style={[styles.rowContainer, { backgroundColor: "#8D1900" }]}
            onPress={onPostRide}
          >
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Post Ride</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostRideScreen;
