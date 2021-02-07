import React from "react";
import { View, Text } from "react-native";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen.js";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={RegistrationScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
