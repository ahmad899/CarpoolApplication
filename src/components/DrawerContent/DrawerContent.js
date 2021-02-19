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

const DrawerContent = (props) => {
  const [user, setUser] = useState([]);

  const userId = auth.currentUser.uid;
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        setUser(documentSnapshot.data());
      });
    return unsubscribe;
  }, []);

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
              onPress={() => props.navigation.navigate("Home")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="car" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>My Ride</Text>}
              onPress={() => props.navigation.navigate("Ride")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="road" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>Post Ride</Text>}
              onPress={() => props.navigation.navigate("PostRide")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="road" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>View Rides</Text>}
              onPress={() => props.navigation.navigate("ViewRides")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Fontisto name="history" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>History</Text>}
              onPress={() => props.navigation.navigate("History")}
              style={styles.drawerItem}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="ios-settings" size={24} color="#ad462f" />
              )}
              label={() => <Text style={styles.DrawerText}>Settings</Text>}
              onPress={() => props.navigation.navigate("Settings")}
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
          onPress={() =>
            auth.signOut().then(() => props.navigation.replace("Login"))
          }
          style={styles.drawerItem}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
