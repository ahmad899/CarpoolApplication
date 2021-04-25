import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Button,
  DevSettings,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "../../src/screens/HomeScreen/HomeScreen";
import Profile from "../../src/screens/Profile/Profile";
import Settings from "../../src/screens/Settings/Settings";
import { createStackNavigator } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { auth, db } from "../../firebaseConfig/firebaseConfig";
import PostRideScreen from "../../src/screens/PostRideScreen/PostRideScreen";
import HistoryRideScreen from "../../src/screens/HistoryRideScreen/HistoryRideScreen";
import DrawerContent from "../../src/components/DrawerContent/DrawerContent";
import ViewRidesScreen from "../../src/screens/ViewRidesScreen/ViewRidesScreen";
import MyRides from "../../src/screens/MyRides/MyRides";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import NotificationScreen from "../../src/screens/NotificationScreen/NotificationScreen";
import ChatsScreen from "../../src/screens/ChatsScreen/ChatsScreen";
import ViewProfileScreen from "../../src/screens/ViewProfileScreen/ViewProfileScreen";

const Drawer = createDrawerNavigator();

const HomeStackNavigator = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(userId)
      .onSnapshot(
        (documentSnapshot) => {
          setUser(documentSnapshot.data());
        },
        (error) => {
          console.log(error);
        }
      );
    return unsubscribe;
  }, []);

  //changing header layout
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <EvilIcons
            name="navicon"
            size={35}
            color="white"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  //custom drawer content
  if (user === null) return <LoadingSpinner />;
  else
    return (
      <Drawer.Navigator
        initialRouteName={"Home"}
        drawerContent={(props) => (
          <DrawerContent
            {...props}
            location={route.params.location}
            user={user}
          />
        )}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ location: route.params.location, user: user }}
        />
        <Drawer.Screen name="PostRide" component={PostRideScreen} />
        <Drawer.Screen name="History" component={HistoryRideScreen} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="ViewRides" component={ViewRidesScreen} />
        <Drawer.Screen name="MyRide" component={MyRides} />
        <Drawer.Screen name="Notification" component={NotificationScreen} />
        <Drawer.Screen name="ChatsScreen" component={ChatsScreen} />
        <Drawer.Screen name="ViewProfile" component={ViewProfileScreen} />
      </Drawer.Navigator>
    );
};

export default HomeStackNavigator;
const styles = StyleSheet.create({
  header: {
    marginLeft: 5,
  },
});
