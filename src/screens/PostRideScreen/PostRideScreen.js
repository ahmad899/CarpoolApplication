import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import PostRideMap from "../../components/PostRideMap/PostRideMap";
import styles from "./styles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MaterialIcons } from "@expo/vector-icons";
import placesApi from "../../../api/googleApi";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { compareAsc, format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

const initialState = null;
const PostRideScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [originPlace, setOriginPlace] = useState(initialState);
  const [destinationPlace, setdestinationPlace] = useState(initialState);

  useEffect(() => {
    if (originPlace !== initialState && destinationPlace !== initialState) {
      console.log(originPlace);
      console.log(destinationPlace);
    }
  }, [originPlace, destinationPlace]);

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
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <PostRideMap />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.rowContainer}>
            <MaterialIcons name="add-location" size={30} color="black" />
            <GooglePlacesAutocomplete
              placeholder="From?"
              onPress={(data, details = null) => {
                setOriginPlace({ value: { data, details } });
              }}
              styles={{ textInput: styles.textInput }}
              fetchDetails
              query={{
                key: "AIzaSyCUQoLbBsZz1WWOIQKro8Kx8rzZuZyRPyo",
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
                setdestinationPlace({ value: { data, details } });
              }}
              styles={{ textInput: styles.textInput }}
              fetchDetails
              query={{
                key: "AIzaSyCUQoLbBsZz1WWOIQKro8Kx8rzZuZyRPyo",
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
                placeholder={format(date, "MMMM do, yyyy ")}
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
                placeholder={format(date, "H:mm a")}
                editable={false}
              />
            </Pressable>
          </View>
          <TouchableOpacity
            style={[styles.rowContainer, { backgroundColor: "#8D1900" }]}
          >
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Post Ride</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostRideScreen;
