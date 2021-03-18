import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  fromToInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  fromToText: {
    fontSize: 14,
  },
  userRequest: { margin: 10 },
  userRequestText: {
    fontSize: 17,
    fontWeight: "700",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopWidth: 1,
  },
  button: {},
  lineBetween: {
    borderWidth: 0.5,
    marginTop: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonChild: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});
export default styles;
