import React, { useEffect, useLayoutEffect, useState } from "react";
import { Pressable } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { auth, db } from "../../../firebaseConfig/firebaseConfig";
import styles from "./styles";
import { Button } from "react-native";
import Dialog from "react-native-dialog";
import * as firebase from "firebase";
import LoadingSpinner from "../../components/LoadingSpinner";
const Profile = ({ navigation, route }) => {
  const user = route.params.userInfo;
  const [firstName, setFirstName] = useState(user.firstName);
  const [secondName, setSecondName] = useState(user.secondName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(user.userType);
  const [driverInfo, setDriverInfo] = useState(user.driverInfo);
  const [userCurrentPass, setUserCurrentPass] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [emailVisible, setemailVisible] = useState(false);
  const [phone, setPhone] = useState(user.phone);

  useEffect(() => {
    if (route.params.driverInfo) {
      setDriverInfo(route.params.driverInfo);
    }
  }, [route.params]);

  const showPassDialog = () => {
    setPassVisible(true);
  };

  const showEmailDialog = () => {
    setemailVisible(true);
  };

  const handlePassCancel = () => {
    setPassVisible(false);
  };
  const handleEmailCancel = () => {
    setemailVisible(false);
  };

  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const onChangePassword = () => {
    setLoading(true);
    if (userCurrentPass === "" || password === "")
      alert("please fill information");
    setTimeout(() => {
      reauthenticate(userCurrentPass)
        .then(() => {
          const user = auth.currentUser;
          user
            .updatePassword(password)
            .then(() => {
              setLoading(false);
              setPassVisible(false);
              alert("Password updated!");
              onSave();
            })
            .catch((error) => {
              setLoading(false);
              setPassVisible(false);
              alert(error);
            });
        })
        .catch((error) => {
          setLoading(false);
          setPassVisible(false);
          alert(error);
        });
    }, 5000);
  };

  const onChangeEmail = () => {
    setLoading(true);
    reauthenticate(userCurrentPass)
      .then(() => {
        const user = auth.currentUser;
        user
          .updateEmail(email)
          .then(() => {
            setLoading(false);
            setemailVisible(false);
            alert("Email updated!");
            onSave();
          })
          .catch((error) => {
            setLoading(false);
            setemailVisible(false);
            alert(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        setemailVisible(false);
        alert(error);
      });
  };

  const onSave = () => {
    if (firstName == "" || secondName == "") alert("Fill inputs");
    else {
      setLoading(true);
      const userId = auth.currentUser.uid;
      if (driverInfo) {
        db.collection("users")
          .doc(userId)
          .update({
            firstName: firstName,
            secondName: secondName,
            email: email,
            driverInfo: driverInfo,
            phone: phone,
          })
          .then(() => {
            setLoading(false);
            alert("User Information Saved");
          });
      } else {
        db.collection("users")
          .doc(userId)
          .update({
            firstName: firstName,
            secondName: secondName,
            email: email,
          })
          .then(() => {
            setLoading(false);
            alert("User Information Saved");
          });
      }
    }
  };

  const onEditDriverInfo = () => {
    navigation.navigate("EditDriverInfo", {
      userDriverInfo: driverInfo,
      onSave,
    });
  };

  if (loading) return <LoadingSpinner />;
  else
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.topContainer}>
          <ScrollView>
            <View style={styles.profileAvatar}>
              <TouchableOpacity>
                <Avatar
                  rounded
                  size={100}
                  source={{
                    uri:
                      "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png",
                  }}
                />
              </TouchableOpacity>
              <Text>{userType}</Text>
            </View>

            <View style={styles.textInputContainer}>
              <View style={styles.textInput}>
                <Text style={styles.label}>First Name : </Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.label}>Second Name : </Text>
                <TextInput
                  style={styles.input}
                  value={secondName}
                  onChangeText={(text) => setSecondName(text)}
                />
              </View>
              <View style={styles.textInput}>
                <Text style={styles.label}>Phone : </Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
              <Pressable onPress={showEmailDialog}>
                <View style={styles.textInput}>
                  <Text style={styles.label}>Email : </Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    editable={false}
                  />
                </View>
                <Dialog.Container visible={emailVisible}>
                  <Dialog.Title>Change Email</Dialog.Title>
                  <Dialog.Input
                    placeholder="Current Password"
                    onChangeText={(text) => setUserCurrentPass(text)}
                  />
                  <Dialog.Input
                    placeholder="New Email"
                    onChangeText={(text) => setEmail(text)}
                  />
                  <Dialog.Button label="Cancel" onPress={handleEmailCancel} />
                  <Dialog.Button label="Save" onPress={onChangeEmail} />
                </Dialog.Container>
              </Pressable>
              <Pressable onPress={showPassDialog}>
                <View style={styles.textInput}>
                  <Text style={styles.label}>Password : </Text>
                  <TextInput
                    style={styles.input}
                    value="fsdfsdfsdfsd"
                    secureTextEntry={true}
                    editable={false}
                  />
                </View>
                <Dialog.Container visible={passVisible}>
                  <Dialog.Title>Change Password</Dialog.Title>
                  <Dialog.Input
                    placeholder="Current Password"
                    onChangeText={(text) => setUserCurrentPass(text)}
                  />
                  <Dialog.Input
                    placeholder="New Password"
                    onChangeText={(text) => setPassword(text)}
                  />
                  <Dialog.Button label="Cancel" onPress={handlePassCancel} />
                  <Dialog.Button label="Save" onPress={onChangePassword} />
                </Dialog.Container>
              </Pressable>
              {userType === "Driver" ? (
                <TouchableOpacity
                  style={[styles.textInput, { justifyContent: "center" }]}
                  onPress={onEditDriverInfo}
                >
                  <Text style={styles.label}>Edit Driver Information</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ padding: 10, margin: 10 }}></View>
              )}
              <TouchableOpacity
                style={[
                  styles.textInput,
                  {
                    backgroundColor: "#8D1900",
                    justifyContent: "center",
                  },
                ]}
                onPress={onSave}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
};

export default Profile;
