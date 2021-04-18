import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const UserRow = ({ id, data }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.innerContainer}
        onPress={() =>
          navigation.navigate("UserProfileScreen", { id: id, data: data })
        }
      >
        <Avatar
          rounded
          size={70}
          source={{
            uri:
              "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
          }}
        />
        <Text style={styles.text}>
          {data.firstName} {data.secondName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserRow;
