import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, ScrollView, TextInput } from "react-native";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native";
import firebase from "firebase";
import { useRoute } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { db, auth } from "../../../firebaseConfig/firebaseConfig";
import { Avatar } from "react-native-elements";

const RideChatScreen = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats")
      .doc(route.params.id)
     /*  .collection("users")
      .doc(auth.currentUser.uid) */
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
/*       .collection("users")
      .doc(auth.currentUser.uid) */
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.messageContainer}>
          {messages.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.reciever}>
                <Avatar
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    right: -5,
                  }}
                  source={{ uri: data.photoURL }}
                  rounded
                  size={30}
                  position="absolute"
                  bottom={-15}
                  right={-5}
                />
                <Text style={styles.reciverText}>{data.message}</Text>
              </View>
            ) : (
              <View style={styles.sender}>
                <Avatar
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    left: -5,
                  }}
                  source={{ uri: data.photoURL }}
                  rounded
                  size={30}
                  position="absolute"
                  bottom={-15}
                  left={-5}
                />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
          )}
        </View>
        <KeyboardAvoidingView style={styles.footer}>
          <TextInput
            placeholder="Signal message"
            style={styles.textInput}
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#2b68e6" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideChatScreen;
