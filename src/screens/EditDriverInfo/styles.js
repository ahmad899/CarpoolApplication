import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ad462f",
  },
  topContainer: {
    backgroundColor: "white",
    alignItems: "center",
    height: "90%",
    width: "90%",
    margin: 10,
    borderRadius: 50,
  },

  textInputContainer: {
    width: "100%",
    padding: 10,
  },
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: "#ad462f",
    width: 300,
  },
  input: {
    width: "100%",
    paddingHorizontal: 5,
    color: "white",
    fontSize: 15,
  },
  label: {
    fontSize: 15,
    color: "white",
  },

  buttonTitle: {
    fontSize: 20,
    color: "white",
  },
});
