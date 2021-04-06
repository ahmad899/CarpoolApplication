import React, { useEffect, useState } from "react";
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
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
const DrawerContent = (props) => {
  const user = props.user;
  const location = props.location;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#ad462f" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
                width: "85%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                rounded
                size={100}
                source={{
                  uri:
                    "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
                }}
              />
              <View>
                <Title>{user.firstName}</Title>
              </View>
              <Caption>{user.userType}</Caption>
            </View>
          </View>
          <Drawer.Section style={styles.drawSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="ios-home" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>Home</Text>}
              onPress={() => navigation.replace("Home")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="car" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>My Ride</Text>}
              onPress={() => navigation.navigate("MyRide")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="notifications" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>Notifications</Text>}
              onPress={() => navigation.navigate("Notification")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="road" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>Post Ride</Text>}
              onPress={() =>
                navigation.navigate("PostRide", { location, user })
              }
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="road" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>View Rides</Text>}
              onPress={() => navigation.navigate("ViewRides", { user: user })}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Fontisto name="history" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>History</Text>}
              onPress={() => navigation.navigate("History")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="profile" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>View Profiles</Text>}
              onPress={() =>
                navigation.navigate("Settings", { userInfo: user })
              }
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Entypo name="chat" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>Chat</Text>}
              onPress={() =>
                navigation.navigate("ChatsScreen", { userInfo: user })
              }
              style={styles.drawerItem}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="ios-settings" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>Settings</Text>}
              onPress={() =>
                navigation.navigate("Settings", { userInfo: user })
              }
              style={styles.drawerItem}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={{ marginTop: 10 }}>
        <DrawerItem
          icon={({ color, size }) => (
            <Octicons name="sign-out" size={24} color="#ad462f" />
          )}
          label={() => <Text style={styles.DrawerText}>Log Out</Text>}
          onPress={() => auth.signOut().then(() => navigation.replace("Login"))}
          style={styles.drawerItem}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
