import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
const EditDriverInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [driverInfo, setDriverInfo] = useState(route.params.userDriverInfo);
  const onSaveDriverInfo = route.params.onSaveDriverInfo;
  const onSave = () => {
    onSaveDriverInfo(driverInfo);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.topContainer}>
        <ScrollView>
          <View style={styles.textInputContainer}>
            <View style={styles.textInput}>
              <Text style={styles.label}>Driver License : </Text>
              <TextInput
                style={styles.input}
                value={driverInfo.driverLicense}
                onChangeText={(text) =>
                  setDriverInfo({ ...driverInfo, driverLicense: text })
                }
              />
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Car Type : </Text>
              <TextInput
                style={styles.input}
                value={driverInfo.carType}
                onChangeText={(text) =>
                  setDriverInfo({ ...driverInfo, carType: text })
                }
              />
            </View>

            <View style={styles.textInput}>
              <Text style={styles.label}>Car Model : </Text>
              <TextInput
                style={styles.input}
                value={driverInfo.carModel}
                onChangeText={(text) =>
                  setDriverInfo({ ...driverInfo, carModel: text })
                }
              />
            </View>
            <View style={styles.textInput}>
              <Text style={styles.label}>Car Plate Number : </Text>
              <TextInput
                style={styles.input}
                value={driverInfo.carPlateNumber}
                onChangeText={(text) =>
                  setDriverInfo({ ...driverInfo, carPlateNumber: text })
                }
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[
            styles.textInput,
            {
              backgroundColor: "#8D1900",
              justifyContent: "center",
              position: "absolute",
              bottom: 0,
            },
          ]}
          onPress={onSave}
        >
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>Save</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditDriverInfo;
