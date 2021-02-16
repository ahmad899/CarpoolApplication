import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import {
  FontAwesome,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Caption, Title } from "react-native-paper";

import styles from "./styles";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { auth } from "../../../firebaseConfig/firebaseConfig";

const DrawerContent = (props) => (
  <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View>
            <Avatar
              rounded
              size={100}
              source={{
                uri:
                  "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
              }}
            />
            <View>
              <Title>User Name</Title>
            </View>
            <Caption>user Type</Caption>
          </View>
        </View>
        <Drawer.Section style={styles.drawSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="ios-home" size={24} color="black" />
            )}
            label="Home"
            onPress={() => props.navigation.navigate("Home")}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <FontAwesome name="car" size={24} color="black" />
            )}
            label="My Ride"
            onPress={() => props.navigation.navigate("Ride")}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="road" size={24} color="black" />
            )}
            label="Post Ride"
            onPress={() => props.navigation.navigate("PostRide")}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <Fontisto name="history" size={24} color="black" />
            )}
            label="History"
            onPress={() => props.navigation.navigate("History")}
          />

          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="ios-settings" size={24} color="black" />
            )}
            label="Settings"
            onPress={() => props.navigation.navigate("Settings")}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
    <Drawer.Section>
      <DrawerItem
        icon={({ color, size }) => (
          <Octicons name="sign-out" size={24} color="black" />
        )}
        label="Log Out"
        onPress={() =>
          auth.signOut().then(() => props.navigation.replace("Login"))
        }
      />
    </Drawer.Section>
  </View>
);

export default DrawerContent;
