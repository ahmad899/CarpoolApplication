import React from "react";
import { View, Text } from "react-native";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./navigation/HomeStackNavigator/HomeStackNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const App = () => {
  //changing header style for all screen
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "white", height: 50 },
    headerTitleStyle: {
      color: "black",
    },
    headerTitleAlign: "center",
    headerTintColor: "white",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={RegistrationScreen} />
        <Stack.Screen
          name="Home"
          component={HomeStackNavigator}
          options={({ navigation, route }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
