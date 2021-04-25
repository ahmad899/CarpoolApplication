import React, { useEffect, useLayoutEffect, useState } from "react";
import { Pressable } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import styles from "./styles";
import { Button } from "react-native";
import Dialog from "react-native-dialog";
import * as firebase from "firebase";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useRoute } from "@react-navigation/native";
const UserProfileScreen = ({ navigation, route }) => {
  const user = route.params.data;
  const userType = user.userType;
  const chatid = auth.currentUser.uid + user.userId;
  
  const createChat = async () => {
    await db
      .collection("chats")
      .doc(chatid)
      .set({
        chatSenderName: auth.currentUser.displayName,
        chatReciveName: user.firstName,
        userRecivingId: auth.currentUser.uid,
        userSendingId: user.userId,
      })
      .then((res) => navigation.navigate("RideChatScreen", { id: chatid }))
      .catch((er) => alert(er));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.topContainer}>
        <ScrollView>
          <View style={styles.profileAvatar}>
            <TouchableOpacity>
              <Avatar
                rounded
                size={100}
                source={{
                  uri:
                    "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
                }}
              />
            </TouchableOpacity>
            <Text>{userType}</Text>
          </View>

          <View style={styles.textInputContainer}>
            <View style={styles.textInput}>
              <Text style={styles.label}>First Name : </Text>
              <Text style={styles.input}>{user.firstName}</Text>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Second Name : </Text>
              <Text style={styles.input}>{user.secondName}</Text>
            </View>

            <View style={styles.textInput}>
              <Text style={styles.label}>Email : </Text>
              <Text style={styles.input}>{user.email}</Text>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>User Type : </Text>
              <Text style={styles.input}>{user.userType}</Text>
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Phone : </Text>
              <Text style={styles.input}>{user.phone}</Text>
            </View>
            {userType === "Driver" ? (
              <View>
                <View style={styles.textInput}>
                  <Text style={styles.label}>Car Model : </Text>
                  <Text style={styles.input}>{user.driverInfo.carModel}</Text>
                </View>
                <View style={styles.textInput}>
                  <Text style={styles.label}>Car Plate Number : </Text>
                  <Text style={styles.input}>
                    {user.driverInfo.carPlateNumber}
                  </Text>
                </View>
                <View style={styles.textInput}>
                  <Text style={styles.label}>Car Type : </Text>
                  <Text style={styles.input}>{user.driverInfo.carType}</Text>
                </View>
                <View style={styles.textInput}>
                  <Text style={styles.label}>Driver License : </Text>
                  <Text style={styles.input}>
                    {user.driverInfo.driverLicense}
                  </Text>
                </View>
                <View style={styles.textInput}>
                  <Text style={styles.label}>User Id: </Text>
                  <Text style={styles.input}>
                    {user.driverInfo.userIdentificationNum}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ padding: 10, margin: 10 }}></View>
            )}
            {auth.currentUser.uid === user.userId ? (
              <View></View>
            ) : (
              <TouchableOpacity
                onPress={createChat}
                style={[
                  styles.textInput,
                  {
                    backgroundColor: "#8D1900",
                    justifyContent: "center",
                  },
                ]}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Send Message</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
