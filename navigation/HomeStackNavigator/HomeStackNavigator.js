import React, { useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { Avatar } from "react-native-elements";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = ({ navigation }) => {
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
            color="black"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  //custom drawer content
  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="LogOut"
        onPress={() => auth.signOut().then(() => navigation.replace("Login"))}
      />
      <Avatar
        rounded
        source={{
          uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        }}
      />
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default HomeStackNavigator;
const styles = StyleSheet.create({
  header: {
    marginLeft: 5,
  },
});
