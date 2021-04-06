import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import CustomListItem from "../../components/CustomListItem/CustomListItem";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
const ChatsScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const userId = auth.currentUser.uid;
  const chat = db.collection("chats");

  const getUserChat = async () => {
    const recivingId = chat.where("userRecivingId", "==", userId).get();
    const sendingId = chat.where("userSendingId", "==", userId).get();
    const [recQueryId, sendQueryId] = await Promise.all([
      recivingId,
      sendingId,
    ]);
    const recId = recQueryId.docs;
    const sendId = sendQueryId.docs;
    const chatArr = recId.concat(sendId);
    return chatArr;
  };

  useEffect(() => {
    const unsubscribe = async () =>
      await getUserChat().then((result) =>
        setChats(
          result.map((snapshot) => ({
            id: snapshot.id,
            data: snapshot.data(),
            chatName:
              snapshot.data().userRecivingId == userId
                ? snapshot.data().chatReciveName
                : snapshot.data().chatSenderName,
          }))
        )
      );

    unsubscribe();
    return unsubscribe;
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("RideChatScreen", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data, chatName }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatsScreen;
