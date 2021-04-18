import React, { useState, useEffect, useLayoutEffect } from "react";
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
import EditMyRideMap from "../../components/EditMyRideMap/EditMyRideMap";
const initialState = null;

const EditMyRideScreen = () => {
  const route = useRoute();

  const data = route.params.data;
  const newDate = new Date();
  const [date, setDate] = useState(newDate);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [userDB, setUserDB] = useState(initialState);
  const [originPlace, setOriginPlace] = useState(initialState);
  const [destinationPlace, setdestinationPlace] = useState(initialState);
  const [showDateVlaue, setshowDateVlaue] = useState(false);
  const [showTimeVlaue, setshowTimeVlaue] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [btnColor, setbtnColor] = useState("#677570");
  const navigation = useNavigation();
  const userOriginName = data.originName;
  const userDestinationName = data.destinationName;
  const fireBaseTime = new Date(
    data.date.seconds * 1000 + data.date.nanoseconds / 1000000
  );
  const userDate = fireBaseTime.toDateString();
  const time = fireBaseTime.toLocaleTimeString();
  console.log(route);
  useLayoutEffect(() => {
    if (originPlace === initialState && destinationPlace === initialState) {
      setBtnDisable(true);
      setbtnColor("#677570");
    } else {
      setBtnDisable(false);
      setbtnColor("#8D1900");
    }
  }, [originPlace, destinationPlace]);

  const onPostRide = async () => {
    const user = auth.currentUser;
    await db
      .collection("rides")
      .doc(route.params.id)
      .set({
        rideInfo: {
          originPlace: originPlace.details.geometry.location,
          destinationPlace: destinationPlace.details.geometry.location,
          originName: originPlace.details.name,
          destinationName: destinationPlace.details.name,
          date: date,
          distance: distance,
          duration: duration,
          user: data.user,
        },
        userType: data.user.userType,
        userId: user.uid,
        rideId: route.params.id,
      })
      .then(() => navigation.goBack())

      .catch((er) => console.log(er));
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
        <EditMyRideMap
          originPlace={originPlace}
          destinationPlace={destinationPlace}
          userOriginPlace={data.originPlace}
          userDestinationPlace={data.destinationPlace}
          setDistance={onDistnace}
          setDuration={onDuration}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.rowContainer}>
            <MaterialIcons name="add-location" size={30} color="black" />
            <GooglePlacesAutocomplete
              placeholder={userOriginName}
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
              placeholder={userDestinationName}
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
                style={{ fontSize: 15, fontWeight: "bold", color: "black" }}
                placeholder={
                  showDateVlaue ? format(date, "MMMM do, yyyy ") : userDate
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
                style={{ fontSize: 15, fontWeight: "bold", color: "black" }}
                placeholder={showTimeVlaue ? format(date, "H:mm a") : time}
                editable={false}
              />
            </Pressable>
          </View>
          <TouchableOpacity
            style={[styles.rowContainer, { backgroundColor: btnColor }]}
            onPress={onPostRide}
            disabled={btnDisable}
          >
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Save Informaion</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditMyRideScreen;
