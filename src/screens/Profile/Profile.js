import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Profile = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
